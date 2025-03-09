## Contact

Add the following sections after the "Contact" section:

## 📚 Usage Guide

### Admin Dashboard

The admin dashboard provides comprehensive management capabilities:

1. **Login**: Access the admin area at `/admin/login`
2. **Event Management**: 
   - View all training events
   - Approve or reject submitted events
   - Edit event details
   - Delete events
   - View analytics for each event

### Project Calculator

The project calculator helps potential clients estimate project costs:

1. Navigate to `/calculator`
2. Select project type (website, software, blockchain)
3. Choose required features
4. Adjust timeline preferences
5. Get instant cost estimation
6. Share estimate via WhatsApp with one click

### Training Event Submission

To advertise a training event:

1. Navigate to `/advertise-training`
2. Fill in event details (title, description, date, location, etc.)
3. Upload event image
4. Complete payment
5. Receive confirmation email
6. Event will be listed after admin approval

## 🔍 API Documentation

The application exposes several API endpoints:

### Payment API

- `POST /api/payment`: Initiates payment process
- `GET /api/payment/verify`: Verifies payment status

### Analytics API

- `POST /api/analytics/click`: Tracks event clicks and engagement

## 🛡️ Security

This application implements several security measures:

- **Authentication**: Secure user authentication via Supabase
- **Authorization**: Role-based access control for admin features
- **Data Validation**: Input validation using Zod schemas
- **CSRF Protection**: Built-in protection against cross-site request forgery
- **Environment Variables**: Sensitive information stored in environment variables
- **API Rate Limiting**: Protection against abuse

## 🔄 CI/CD

The project uses a continuous integration and deployment workflow:

1. **Code Linting**: Automatic code quality checks
2. **Type Checking**: TypeScript validation
3. **Automated Testing**: Unit and integration tests
4. **Preview Deployments**: Vercel preview deployments for pull requests
5. **Production Deployment**: Automatic deployment to production on main branch

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify DATABASE_URL is correct
   - Check database server is running
   - Ensure firewall allows connections

2. **Authentication Problems**
   - Verify Supabase credentials
   - Check JWT secret is properly configured
   - Clear browser cookies and try again

3. **Payment Processing Issues**
   - Confirm Paystack API keys are correct
   - Verify webhook URLs are properly configured
   - Check transaction logs in Paystack dashboard

## 🌱 Roadmap

Future development plans include:

- **User Profiles**: Enhanced user account management
- **Course Management**: Full LMS functionality
- **Mobile Application**: Native mobile apps for iOS and Android
- **AI Integration**: Smart recommendations and content generation
- **Expanded Payment Options**: Support for multiple payment gateways
- **Internationalization**: Multi-language support

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Prisma](https://prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.io/)
- [Paystack](https://paystack.com/)
- [Vercel](https://vercel.com/)

