# Station2290 Order Panel

A specialized order management interface for Station2290 coffee shop kitchen and service staff, built with Vite, React, TypeScript, and TanStack Router. Part of the Station2290 microservices ecosystem.

## 🚀 Features

### 📋 Real-time Order Management
- **Live Order Feed**: Real-time order notifications and updates
- **Order Queue**: Visual order queue with status tracking
- **Kitchen Display**: Optimized interface for kitchen workflow
- **Order Processing**: Quick status updates and completion tracking

### ⚡ Kitchen Workflow
- **Order Prioritization**: Sort orders by time, type, or priority
- **Status Tracking**: Visual indicators for order progress
- **Quick Actions**: One-click status updates
- **Timer Integration**: Track preparation times

### 📱 Touch-Optimized Interface
- **Tablet-Friendly**: Designed for kitchen tablets and touch screens
- **Large Touch Targets**: Easy interaction for busy kitchen environment
- **Minimal UI**: Clean, distraction-free interface
- **Dark Mode**: Kitchen-friendly dark theme

### 🔔 Notifications & Alerts
- **Audio Alerts**: Sound notifications for new orders
- **Visual Indicators**: Color-coded order status
- **Priority Alerts**: Special handling for urgent orders
- **System Notifications**: Real-time updates via Server-Sent Events

### 📊 Performance Tracking
- **Order Metrics**: Track completion times and efficiency
- **Kitchen Analytics**: Performance insights for staff
- **Rush Hour Management**: Special modes for busy periods

## 🏗️ Station2290 Architecture

### Microservices Ecosystem

This order panel is part of the Station2290 coffee shop management system:

- **Infrastructure**: [Station2290-Infrastructure](https://github.com/Station-2290/infrastructure)
- **API Backend**: [Station2290-API](https://github.com/Station-2290/api)
- **Customer Website**: [Station2290-Web](https://github.com/Station-2290/web)
- **WhatsApp Bot**: [Station2290-Bot](https://github.com/Station-2290/bot)
- **Admin Panel**: [Station2290-Adminka](https://github.com/Station-2290/adminka)
- **Order Panel**: [Station2290-Order-Panel](https://github.com/Station-2290/order-panel) (this repository)

### 🔄 Automatic Deployment

This order panel **deploys automatically** when you push to the `main` branch:

1. **GitHub Actions** builds the Vite application
2. **Creates** optimized static build
3. **Containerizes** with Nginx for production serving
4. **Deploys** to production VPS via SSH
5. **Health checks** ensure panel accessibility

**Production URL**: https://orders.station2290.ru

## 🛠 Technology Stack

- **Framework**: Vite + React 19
- **Language**: TypeScript
- **Routing**: TanStack Router (file-based routing)
- **State Management**: TanStack Query for server state
- **Real-time**: Server-Sent Events (SSE) for live order updates
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **Theme**: next-themes with kitchen-optimized dark mode
- **Audio**: Web Audio API for notification sounds
- **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites

**For Local Development:**
- Node.js 18+
- pnpm package manager
- Access to Station2290 API (local or remote)
- Employee account with order management permissions

**For Production Deployment:**
- Infrastructure repository deployed on VPS
- GitHub Secrets configured for automated deployment

### Local Development Setup

1. **Clone the repository:**
```bash
git clone https://github.com/Station-2290/order-panel.git
cd order-panel
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Environment Configuration:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Environment Variables:**

**Local Development:**
```bash
# API Configuration
VITE_API_URL=http://localhost:3000/api/v1

# Application Settings
VITE_APP_TITLE=Station2290 Orders
VITE_APP_DESCRIPTION=Kitchen Order Management

# Development Mode
NODE_ENV=development

# Real-time Features
VITE_ENABLE_SSE=true
VITE_ENABLE_AUDIO=true
```

**Production Environment:**
```bash
# Production API
VITE_API_URL=https://api.station2290.ru/api/v1

# Application Settings
VITE_APP_TITLE=Station2290 Orders
VITE_APP_DESCRIPTION=Kitchen Order Management

# Production Mode
NODE_ENV=production

# Real-time Features
VITE_ENABLE_SSE=true
VITE_ENABLE_AUDIO=true
```

5. **Start Development Server:**
```bash
pnpm start
# or
pnpm dev
```

**Local Order Panel**: http://localhost:8081

## 📜 Available Scripts

```bash
# Development
pnpm start        # Start development server (port 8081)
pnpm dev          # Alternative development command

# Building
pnpm build        # Build for production
pnpm serve        # Preview production build

# Code Quality
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm check        # Run lint + format

# Testing
pnpm test         # Run tests with Vitest

# API Types
pnpm gen:api      # Generate API types from OpenAPI schema
```

## 📁 Project Structure

```
src/
├── routes/                 # TanStack Router file-based routes
│   ├── __root.tsx         # Root layout
│   ├── index.tsx          # Order queue dashboard
│   ├── orders/           # Order detail routes
│   └── settings/         # Panel settings
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── orders/           # Order-specific components
│   ├── kitchen/          # Kitchen workflow components
│   └── layout/           # Layout components
├── hooks/                # Custom React hooks
│   ├── useSSE.ts         # Server-Sent Events hook
│   ├── useAudio.ts       # Audio notifications hook
│   └── useOrderQueue.ts  # Order queue management
├── lib/                  # Utility functions
├── services/             # API services
├── types/                # TypeScript type definitions
└── __generated__/        # Auto-generated API types
```

## 🎯 Core Features

### Order Queue Management
- **Real-time Updates**: Live order feed with SSE integration
- **Visual Queue**: Kanban-style order status board
- **Priority Sorting**: Automatic and manual order prioritization
- **Filter Options**: Filter by status, time, or customer type

### Kitchen Workflow
- **Order Cards**: Detailed order information cards
- **Quick Actions**: Fast status change buttons
- **Timer Display**: Visual preparation time tracking
- **Completion Tracking**: Mark orders as ready/completed

### Audio & Visual Notifications
- **Sound Alerts**: Customizable notification sounds
- **Visual Alerts**: Flashing indicators for new orders
- **Priority Signals**: Different alerts for urgent orders
- **Quiet Mode**: Disable audio during specified hours

### Touch Interface
- **Large Buttons**: Easy touch targets for kitchen environment
- **Swipe Gestures**: Swipe to change order status
- **Full-screen Mode**: Distraction-free kitchen display
- **Responsive Design**: Works on tablets and desktop monitors

## 🔐 Authentication & Authorization

### Access Control
- **Employee Authentication**: Secure login for kitchen staff
- **Role-Based Access**: Employee and Manager permissions
- **Session Management**: Persistent authentication
- **API Key Support**: Alternative authentication for kitchen displays

### User Permissions
| Role | Access |
|------|--------|
| **Manager** | Full order management, settings, analytics |
| **Employee** | Order processing, status updates |
| **Kitchen Display** | View-only mode with API key |

## 📡 Real-time Integration

### Server-Sent Events (SSE)
- **Live Order Feed**: Real-time order updates from API
- **Status Synchronization**: Multi-device status sync
- **Connection Management**: Automatic reconnection handling
- **Error Recovery**: Graceful fallback on connection loss

### Event Types
- **order_created**: New order notifications
- **order_updated**: Status change notifications
- **order_completed**: Order completion alerts
- **queue_updated**: Queue position changes

## 🎨 Kitchen-Optimized Design

### Visual Design
- **High Contrast**: Easy reading in kitchen lighting
- **Color Coding**: Intuitive order status colors
- **Large Typography**: Readable from distance
- **Minimal Interface**: Focus on essential information

### Responsive Layout
- **Tablet Portrait**: Primary kitchen tablet mode
- **Desktop Monitor**: Large kitchen display mode
- **Mobile Support**: Manager oversight on phone
- **Multi-screen**: Support for multiple kitchen displays

## 🚀 Production Deployment

### Automatic Deployment Process
1. **Build Optimization**: Vite production build
2. **Asset Optimization**: Optimized for kitchen tablet performance
3. **Service Worker**: Offline functionality for reliability
4. **Health Monitoring**: Kitchen display uptime monitoring

### Performance Features
- **Fast Loading**: Optimized for kitchen tablet hardware
- **Offline Support**: Continue viewing orders during network issues
- **Background Sync**: Sync status changes when connection restored
- **Memory Management**: Efficient handling of large order queues

## 🔧 Kitchen Setup

### Hardware Recommendations
- **Tablet**: 10"+ Android/iPad for primary display
- **Mount**: Kitchen-safe tablet mounting system
- **Network**: Reliable WiFi connection to VPS
- **Audio**: External speakers for notification sounds

### Configuration
- **Auto-login**: Configure API key for unattended operation
- **Display Settings**: Set appropriate brightness and timeout
- **Audio Volume**: Configure notification sound levels
- **Screen Protection**: Use screen protector for kitchen environment

## 🤝 Contributing

1. Create a feature branch from `main`
2. Follow kitchen-workflow-focused design principles
3. Test on tablet devices and touch interfaces
4. Ensure real-time features work reliably
5. Submit pull request with kitchen staff feedback

### Development Guidelines
- Prioritize touch-friendly interface design
- Ensure high contrast and readability
- Test with real kitchen workflow scenarios
- Optimize for tablet performance
- Consider noise and lighting conditions

## 🔧 Troubleshooting

### Common Issues
- **SSE Connection**: Check network and API endpoint
- **Audio Not Playing**: Verify browser audio permissions
- **Touch Responsiveness**: Ensure proper touch target sizes
- **Performance**: Monitor memory usage on older tablets

### Kitchen Support
- **Network Issues**: Offline mode continues to show current orders
- **Device Problems**: Quick restart procedure for kitchen tablets
- **Staff Training**: Simple interface designed for quick learning

## 📞 Support

For technical support or questions about the order panel:
- Create an issue in the GitHub repository
- Check kitchen setup documentation
- Contact development team for urgent kitchen issues

---

**Station2290 Order Panel** - Streamlined order management for efficient kitchen operations ⚡️