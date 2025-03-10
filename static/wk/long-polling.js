class LongPollingConnection {
    constructor(url, protocols = []) {
        this.url = url;
        this.protocols = protocols;
        this.CONNECTING = 0;
        this.OPEN = 1;
        this.CLOSING = 2;
        this.CLOSED = 3;
        this.readyState = this.CONNECTING;
        this.onopen = null;
        this.onmessage = null;
        this.onerror = null;
        this.onclose = null;
        this.pollInterval = 1000; // 1 second polling interval
        this.lastEventId = 0;
        this.connect();
    }

    async connect() {
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Connection': 'keep-alive'
                },
                body: JSON.stringify({ type: 'connect', protocols: this.protocols })
            });

            if (response.ok) {
                this.readyState = this.OPEN;
                if (this.onopen) this.onopen({ type: 'open' });
                this.startPolling();
            } else {
                this.handleError(new Error('Connection failed'));
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    async startPolling() {
        while (this.readyState === this.OPEN) {
            try {
                const response = await fetch(`${this.url}/poll?lastEventId=${this.lastEventId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Connection': 'keep-alive'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.messages && data.messages.length > 0) {
                        data.messages.forEach(msg => {
                            if (this.onmessage) {
                                this.onmessage({ data: msg.data, type: 'message' });
                            }
                            this.lastEventId = msg.id;
                        });
                    }
                }

                await new Promise(resolve => setTimeout(resolve, this.pollInterval));
            } catch (error) {
                this.handleError(error);
                await new Promise(resolve => setTimeout(resolve, this.pollInterval));
            }
        }
    }

    send(data) {
        if (this.readyState !== this.OPEN) {
            throw new Error('Connection is not open');
        }

        fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type: 'message', data })
        }).catch(error => this.handleError(error));
    }

    close() {
        this.readyState = this.CLOSING;
        fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type: 'close' })
        }).finally(() => {
            this.readyState = this.CLOSED;
            if (this.onclose) {
                this.onclose({ type: 'close', wasClean: true, code: 1000 });
            }
        });
    }

    handleError(error) {
        if (this.onerror) {
            this.onerror({ type: 'error', error });
        }
        if (this.readyState !== this.CLOSED) {
            this.readyState = this.CLOSED;
            if (this.onclose) {
                this.onclose({ type: 'close', wasClean: false, code: 1006 });
            }
        }
    }
} 