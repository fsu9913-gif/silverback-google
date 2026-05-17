/**
 * Cloudflare Workers entry point
 * Handles requests for both Silverback and Chigbulaws sites
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const hostname = url.hostname;

    // Determine which site we're serving
    const isChigbulaws = hostname.includes('chigbulaws.com');
    const siteName = env.SITE_NAME || (isChigbulaws ? 'Chigbulaws' : 'Silverback');
    const environment = env.ENVIRONMENT || 'development';

    // Simple HTML response
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${siteName}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      line-height: 1.6;
    }
    .badge {
      display: inline-block;
      padding: 4px 8px;
      background: #f0f0f0;
      border-radius: 4px;
      font-size: 0.875rem;
      margin-left: 10px;
    }
    h1 { color: #333; }
    .info { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
    .info-item { margin: 8px 0; }
    .label { font-weight: 600; color: #666; }
  </style>
</head>
<body>
  <h1>${siteName}<span class="badge">${environment}</span></h1>
  <p>Welcome to ${siteName}, powered by Cloudflare Workers.</p>

  <div class="info">
    <div class="info-item">
      <span class="label">Hostname:</span> ${hostname}
    </div>
    <div class="info-item">
      <span class="label">Environment:</span> ${environment}
    </div>
    <div class="info-item">
      <span class="label">Deployed:</span> ${new Date().toISOString()}
    </div>
  </div>

  <p>This is a placeholder page. Replace this with your actual application content.</p>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=300',
      },
    });
  },
};
