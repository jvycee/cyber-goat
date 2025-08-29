# Ghost + GitHub Integration Setup

This theme now supports automatic deployment to your Ghost site when you push changes to GitHub.

## Setup Instructions

### 1. Get Your Ghost Admin API Credentials

1. Log into your Ghost Admin panel
2. Go to **Settings** → **Integrations**
3. Click **Add custom integration**
4. Name it "GitHub Deploy" (or similar)
5. Copy the following:
   - **Admin API Key**: (looks like `1234567890abcdef:1234567890abcdef...`)
   - **API URL**: (looks like `https://your-site.ghost.io`)

### 2. Add Secrets to GitHub Repository

1. Go to your repository: https://github.com/jvycee/cyber-goat
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Add these repository secrets:

   **GHOST_ADMIN_API_URL**
   ```
   https://your-site.ghost.io
   ```

   **GHOST_ADMIN_API_KEY**
   ```
   [Your Admin API Key from Ghost]
   ```

### 3. Enable GitHub Actions

1. Go to **Actions** tab in your repository
2. Enable workflows if prompted

## How It Works

The workflow automatically:
1. **Triggers** on push to `main` branch
2. **Builds** the theme (CSS, JS compilation)
3. **Creates** a zip file with theme files
4. **Deploys** directly to your Ghost site
5. **Activates** the theme automatically

## Manual Deployment

You can also trigger deployment manually:
1. Go to **Actions** tab
2. Select **Deploy Theme to Ghost**
3. Click **Run workflow**

## Testing Your Setup

1. Make a small change (e.g., update version in package.json)
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test GitHub deployment"
   git push origin main
   ```
3. Check **Actions** tab for deployment status
4. Visit your Ghost site to see the changes

## Versioning and Releases

To create a new release:
```bash
git tag v1.0.5
git push origin v1.0.5
```

This will:
- Deploy the theme
- Create a GitHub release
- Attach the theme zip file

## Troubleshooting

### Deployment Failed
- Check your API credentials are correct
- Ensure your Ghost version is 5.0+
- Check Actions logs for specific errors

### Theme Not Activating
- The theme name must match in Ghost
- Check for validation errors in Ghost logs

### Build Errors
- Run `npm install` locally
- Test with `npm run build`
- Ensure all dependencies are in package.json

## Alternative: Ghost GitHub App

For a simpler setup, you can use the official Ghost GitHub App:
https://ghost.org/integrations/github/

Benefits:
- No API keys needed
- Automatic configuration
- Built-in theme validation

## Security Notes

- Never commit API keys to your repository
- Use GitHub Secrets for sensitive data
- Rotate API keys periodically
- Limit integration permissions in Ghost

## Support

- Ghost Docs: https://ghost.org/docs/
- GitHub Actions: https://docs.github.com/actions
- Theme Development: https://ghost.org/docs/themes/