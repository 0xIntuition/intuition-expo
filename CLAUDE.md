# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Intuition POC Mobile App, a React Native Expo application that provides access to the Intuition decentralized knowledge graph. The app is currently in early development and allows users to explore, contribute to, and interact with the knowledge graph from mobile devices.

## Development Commands

### Basic Operations
- `npm install` - Install dependencies
- `npm start` or `npx expo start` - Start the development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser

### Platform-Specific
- `expo run:android` - Build and run on Android device/emulator
- `expo run:ios` - Build and run on iOS device/simulator

## Architecture

### Project Structure
- `app/` - Main application code using Expo Router file-based routing
  - `app/(tabs)/` - Tab-based navigation structure
  - `app/_layout.tsx` - Root layout with theme and routing
- `components/` - Reusable React components
- `config/` - Configuration files
  - `config/web3/` - Web3 and blockchain configuration (Wagmi, Reown)
- `providers/` - React context providers
  - `providers/Web3Provider.tsx` - Web3 providers wrapper (Wagmi, React Query, AppKit)
- `constants/` - App constants and configuration
- `assets/` - Static assets (fonts, images)
- `test-utils/` - Testing utilities and mocks

### Key Technologies
- **Expo Router**: File-based routing system
- **React Native**: Cross-platform mobile development
- **Wagmi + Viem**: Ethereum wallet connection and interaction
- **Reown AppKit**: Wallet connection UI (formerly WalletConnect)
- **React Query**: Server state management
- **@0xintuition/protocol**: Intuition protocol integration

### Wallet Integration
The app uses Reown AppKit (WalletConnect v3) for wallet connections:
- Configuration located in `config/web3/`
- Project ID: `9894a080a383df0833d5e82404186fdd`
- Supports email auth, social logins (X, Apple, Discord)
- Configured for mainnet and Intuition testnet
- Deep linking: `intuition://`
- Web3 providers wrapped in `providers/Web3Provider.tsx`

### Navigation Structure
- Tab-based navigation with three main tabs:
  - Home (`/`)
  - Account (`/account`)
  - Search (`/search`)
- Modal support for overlays
- Platform-specific icons (SF Symbols for iOS, Material Icons for Android)

### Path Aliases
- `@/*` maps to project root for cleaner imports

### Testing
- Test utilities in `test-utils/` with fixtures and mocks
- Uses React Test Renderer for component testing

## Important Notes
- Project is in early development - features may be incomplete
- Built on Expo SDK ~54.0.8
- TypeScript with strict mode enabled
- Uses React 19.1.0 and React Native 0.81.4