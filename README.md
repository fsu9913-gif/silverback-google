# Silverback Google & Chigbulaws - Cloudflare Workers

This repository contains Cloudflare Workers configurations for multiple projects:
- **Silverback** (silverback-google.com)
- **Chigbulaws** (chigbulaws.com)

## 🚀 Quick Start

### Prerequisites

1. Install [Node.js](https://nodejs.org/) (v18 or later)
2. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```
3. Authenticate with Cloudflare:
   ```bash
   wrangler login
   ```

## 📁 Project Structure

```
.
├── src/
│   └── index.js              # Main Workers entry point
├── wrangler.toml             # Silverback configuration
├── wrangler.chigbulaws.toml  # Chigbulaws configuration
├── wrangler.jsonc            # Legacy config (deprecated)
├── index.html                # Static fallback
├── vercel.json               # Vercel configuration
└── README.md
```

## 🔧 Configuration Files

### Silverback Configuration (`wrangler.toml`)

Main configuration for silverback-google.com with environments:
- **Production**: `silverback-google.com/*`
- **Staging**: `staging.silverback-google.com/*`
- **Development**: Local development

### Chigbulaws Configuration (`wrangler.chigbulaws.toml`)

Configuration for chigbulaws.com with environments:
- **Production**: `chigbulaws.com/*` and `www.chigbulaws.com/*`
- **Staging**: `staging.chigbulaws.com/*`
- **Development**: Local development

## 🌐 Deployment

### Deploy Silverback (Default)

```bash
# Development/Testing
wrangler dev

# Deploy to production
wrangler deploy

# Deploy to specific environment
wrangler deploy --env production
wrangler deploy --env staging
wrangler deploy --env development
```

### Deploy Chigbulaws

```bash
# Development/Testing
wrangler dev --config wrangler.chigbulaws.toml

# Deploy to production
wrangler deploy --config wrangler.chigbulaws.toml

# Deploy to specific environment
wrangler deploy --config wrangler.chigbulaws.toml --env production
wrangler deploy --config wrangler.chigbulaws.toml --env staging
wrangler deploy --config wrangler.chigbulaws.toml --env development
```

## 🔑 Environment Variables & Secrets

### Setting Secrets

Secrets are encrypted environment variables that should never be committed to version control:

```bash
# For Silverback
wrangler secret put SECRET_NAME

# For Chigbulaws
wrangler secret put SECRET_NAME --config wrangler.chigbulaws.toml

# For specific environment
wrangler secret put SECRET_NAME --env production
```

### Environment Variables

Non-sensitive variables are defined in the `[vars]` section of each `wrangler.toml` file.

## 📊 Cloudflare Dashboard

Configure the following in your Cloudflare dashboard:

### 1. Add Domains
- Add `silverback-google.com` to your Cloudflare account
- Add `chigbulaws.com` to your Cloudflare account

### 2. DNS Configuration

For each domain, add DNS records:
```
Type: AAAA
Name: @ (or subdomain)
Content: 100::
Proxy: Enabled (orange cloud)
```

### 3. Routes

Routes are automatically configured via the `[[routes]]` sections in `wrangler.toml` files when you deploy.

### 4. Custom Domains (Workers)

Alternatively, use Workers Custom Domains:
1. Go to Workers & Pages → Your Worker → Settings → Domains & Routes
2. Add Custom Domain
3. Enter your domain (e.g., `silverback-google.com`)

## 🛠️ Local Development

```bash
# Start local dev server for Silverback
wrangler dev

# Start local dev server for Chigbulaws
wrangler dev --config wrangler.chigbulaws.toml

# Access at http://localhost:8787
```

## 📦 Advanced Features

### KV Namespaces

Create and bind KV namespaces for data storage:

```bash
# Create KV namespace
wrangler kv:namespace create "MY_KV"
wrangler kv:namespace create "MY_KV" --preview

# Add the namespace ID to wrangler.toml:
# [[kv_namespaces]]
# binding = "MY_KV"
# id = "your-namespace-id"
# preview_id = "your-preview-namespace-id"
```

### D1 Databases

For SQL databases:

```bash
# Create D1 database
wrangler d1 create my-database

# Add to wrangler.toml:
# [[d1_databases]]
# binding = "DB"
# database_name = "my-database"
# database_id = "your-database-id"
```

### R2 Storage

For object storage:

```bash
# Create R2 bucket
wrangler r2 bucket create my-bucket

# Add to wrangler.toml:
# [[r2_buckets]]
# binding = "MY_BUCKET"
# bucket_name = "my-bucket"
```

## 🔍 Monitoring & Logs

### View Logs

```bash
# Tail logs for Silverback
wrangler tail

# Tail logs for Chigbulaws
wrangler tail --config wrangler.chigbulaws.toml

# Filter logs
wrangler tail --status error
```

### Analytics

- Visit [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages
- Select your worker to view analytics, performance metrics, and error rates

## 🚨 Troubleshooting

### Common Issues

1. **"Zone not found" error**
   - Ensure the domain is added to your Cloudflare account
   - Verify the `zone_name` in `wrangler.toml` matches exactly

2. **Authentication errors**
   - Run `wrangler login` again
   - Check your API token permissions

3. **Route conflicts**
   - Ensure routes don't overlap between workers
   - Check existing routes in Cloudflare Dashboard

### Get Help

```bash
# Check Wrangler version
wrangler --version

# View detailed help
wrangler deploy --help

# Validate configuration
wrangler deploy --dry-run
```

## 📚 Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [Workers Examples](https://developers.cloudflare.com/workers/examples/)
- [Cloudflare Discord](https://discord.gg/cloudflaredev)

## 📝 Migration from Vercel

This repository also includes Vercel configuration files (`vercel.json`). You can deploy to both platforms:

- **Cloudflare Workers**: Edge compute with global distribution
- **Vercel**: Static hosting with serverless functions

Choose based on your needs or deploy to both for redundancy.

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Domain added to Cloudflare account
- [ ] DNS records configured
- [ ] Secrets added (if needed)
- [ ] Test with `wrangler dev`
- [ ] Deploy to staging first
- [ ] Verify staging deployment
- [ ] Deploy to production
- [ ] Monitor logs and analytics

---

**Need help?** Check the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/) or open an issue.
