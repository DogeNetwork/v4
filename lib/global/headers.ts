export default {
    csp: [
        'cross-origin-embedder-policy',
        'cross-origin-opener-policy',
        'cross-origin-resource-policy',
        'content-security-policy',
        'content-security-policy-report-only',
        'expect-ct',
        'feature-policy',
        'origin-isolation',
        'strict-transport-security',
        'upgrade-insecure-requests',
        'x-content-type-options',
        'x-frame-options',
        'x-permitted-cross-domain-policies',
        'x-xss-protection',
    ],
    status: {
        empty: [204, 101, 205, 304],
    },
    method: {
        body: ['GET', 'HEAD'],
    }
}