#!/bin/sh

print_bold_with_outline() {
    local msg="$1"
    local length=${#msg}
    local border=""

    for i in $(seq 1 $((length + 4))); do
        border="${border}#"
    done

    echo -e "\e[1m\e[44m$border\e[0m"
    echo -e "\e[1m\e[44m# $msg #\e[0m
    echo -e "\e[1m\e[44m$border\e[0m"
}

RED="\e[1;31m"
GREEN="\e[1;32m"
YELLOW="\e[1;33m"
BLUE="\e[1;34m"
RESET="\e[0m"

print_bold_with_outline "Welcome to Doge V4, user!"

if ! command -v git > /dev/null; then
    echo -e "${RED}[Error] Git is not installed. Please install Git and try again.${RESET}"
    exit 1
fi

echo -e "${BLUE}[1/4] Cloning Doge Unblocker repository...${RESET}"
if git clone https://github.com/DogeNetwork/v4 > /dev/null 2>&1; then
    echo -e "${GREEN}[Success] Repository cloned successfully.${RESET}"
else
    echo -e "${RED}[Error] Failed to clone repository. Please check your network connection, or see if the v4 folder already exists.${RESET}"
    exit 1
fi

cd v4 || { echo -e "${RED}[Error] Failed to enter the project directory.${RESET}"; exit 1; }

echo -e "${BLUE}[2/4] Installing dependencies (this may take a moment)...${RESET}"
if npm install --progress=false > /dev/null 2>&1; then
    echo -e "${GREEN}[Success] Dependencies installed successfully.${RESET}"
else
    echo -e "${RED}[Error] Failed to install dependencies. Please check for npm errors.${RESET}"
    exit 1
fi

echo -e "${BLUE}[3/4] Starting Doge Unblocker...${RESET}"
npm start

if [ $? -eq 0 ]; then
    echo -e "${GREEN}[Success] Doge Unblocker started successfully.${RESET}"
    echo -e "${YELLOW}[Info] You can access Doge V4 via localhost.${RESET}"
else
    echo -e "${RED}[Error] Failed to start Doge Unblocker. Please check the application logs for details.${RESET}"
    exit 1
fi

echo -e "${BLUE}[4/4] Installation Complete.${RESET}"
