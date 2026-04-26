# Vitarn Vidya - RPA Exam Preparation Platform

A comprehensive RPA exam preparation platform with study materials, quizzes, and progress tracking. Built with Vitarn UI styling and Login with Aacharya authentication.

## Features

- **Comprehensive Study Materials**: All 5 units of RPA syllabus with detailed notes
- **Unit-wise Quizzes**: 10 questions per unit covering all topics
- **Progress Tracking**: Track your learning progress, quiz scores, and time spent
- **Login with Aacharya**: Secure authentication via Āchārya OIDC
- **Vitarn UI Styling**: Clean, modern interface inspired by Vitarn design
- **Responsive Design**: Works on desktop and mobile devices
- **Offline Capable**: Study materials loaded locally, no server needed for content

## Quick Start

### Local Development

1. Clone or download the project
2. Open `index.html` in a web browser
3. Click "Login" to authenticate (requires Aacharya account)
4. Start studying!

### Deployment

#### Vercel Deployment

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in the project directory
3. Follow the prompts

#### Coolify Deployment

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. In Coolify dashboard:
   - Click "Create Project"
   - Connect your Git repository
   - Select the `vitarn-vidya` folder
   - Build settings:
     - Build Command: (none - static site)
     - Publish Directory: `.`
     - Port: 80
3. Deploy!

#### Docker Deployment

```dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
COPY data.js /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY vercel.json /usr/share/nginx/html/
EXPOSE 80
```

Build and run:
```bash
docker build -t vitarn-vidya .
docker run -p 80:80 vitarn-vidya
```

## Project Structure

```
vitarn-vidya/
├── index.html          # Main HTML file
├── data.js            # Course data and quiz questions
├── app.js             # Application logic
├── vercel.json        # Vercel configuration
├── README.md          # This file
└── (optional) Dockerfile
```

## Authentication

The application uses Āchārya OIDC for authentication. To configure:

1. Update the `AACHARYA_CONFIG` in `app.js`:
```javascript
const AACHARYA_CONFIG = {
    baseUrl: 'https://jnwn.xyz',
    clientId: 'VITARN_CLIENT',
    redirectUri: window.location.origin + '/auth/callback'
};
```

2. Ensure your redirect URI is registered in Āchārya console

## Customization

### Adding New Units

Edit `data.js` and add to the `RPA_DATA.units` array:

```javascript
{
    id: 6,
    title: "New Unit Title",
    topics: ["Topic 1", "Topic 2", "Topic 3"],
    content: `# Unit Content in Markdown`,
    quiz: [
        {
            question: "Question text",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correct: 0,
            explanation: "Explanation text"
        }
    ]
}
```

### Styling

The application uses CSS variables for theming. Edit the `:root` section in `index.html`:

```css
:root {
    --vitarn-black: #0a0a0a;
    --vitarn-blue: #2563eb;
    --vitarn-gray: #f5f5f5;
    --vitarn-border: #e5e5e5;
    --vitarn-text: #171717;
    --vitarn-text-light: #737373;
}
```

## Progress Tracking

Progress is stored in `localStorage` under the key `vitarn_vidya_state`. This includes:
- Units completed
- Quiz scores per unit
- Total questions answered
- Time spent studying

Data persists across sessions in the same browser.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is part of the Vitarn ecosystem.

## Support

For issues or questions, contact the Vitarn team.

---

**Vitarn Vidya** - Empowering students with comprehensive exam preparation tools.
