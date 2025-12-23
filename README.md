# UK Network - FiveM Server Website

A modern, responsive website for the UK Network FiveM roleplay server.

## Features

- **Modern Design**: Sleek, gaming-inspired UI with smooth animations
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth scrolling, copy-to-clipboard functionality, and animated sections
- **Server Information**: Display server status, player count, and connection details
- **Feature Showcase**: Highlight server features and capabilities
- **Rules Section**: Clearly display server rules and guidelines
- **Join Instructions**: Easy-to-follow steps for new players

## Files

- `index.html` - Main HTML structure
- `styles.css` - All styling and responsive design
- `script.js` - Interactive functionality and animations

## Customization

### Server Information
- Update the server IP/connection string in `index.html` (line with `id="server-ip"`)
- Modify player count display logic in `script.js` if you have a server API

### Colors & Branding
- Edit CSS variables in `styles.css` (root section) to change color scheme:
  - `--primary-color`: Main brand color
  - `--accent-color`: Highlight color
  - `--dark-bg`: Background color
  - `--text-primary`: Main text color

### Content
- Update features, rules, and other content directly in `index.html`
- Add or remove sections as needed

### Social Links
- Update Discord, Twitter, YouTube links in the footer section

## Deployment

1. Upload all files to your web hosting service
2. Ensure `index.html`, `styles.css`, and `script.js` are in the same directory
3. Access via your domain or hosting URL

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The player count is currently simulated for demonstration. Replace with actual server API integration if available.
- Update the Discord widget link in the join section if you have a Discord server embed code.
- The connection string format is `fivem://connect/YOUR_SERVER_IP` - update with your actual server details.

