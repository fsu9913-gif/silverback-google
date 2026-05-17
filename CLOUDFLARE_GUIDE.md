# Cloudflare Workers Quick Reference

## 🎯 Common Commands

### Development
```bash
# Silverback - Local dev server
wrangler dev

# Chigbulaws - Local dev server
wrangler dev --config wrangler.chigbulaws.toml
```

### Deployment
```bash
# Silverback
wrangler deploy                          # Deploy to default
wrangler deploy --env production         # Deploy to production
wrangler deploy --env staging            # Deploy to staging

# Chigbulaws
wrangler deploy --config wrangler.chigbulaws.toml
wrangler deploy --config wrangler.chigbulaws.toml --env production
wrangler deploy --config wrangler.chigbulaws.toml --env staging
```

### Logs & Monitoring
```bash
# View real-time logs
wrangler tail                                    # Silverback
wrangler tail --config wrangler.chigbulaws.toml  # Chigbulaws

# Filter logs
wrangler tail --status error
wrangler tail --method POST
```

### Secrets Management
```bash
# Add secret
wrangler secret put API_KEY
wrangler secret put API_KEY --config wrangler.chigbulaws.toml

# List secrets
wrangler secret list
wrangler secret list --config wrangler.chigbulaws.toml

# Delete secret
wrangler secret delete API_KEY
```

### KV (Key-Value) Storage
```bash
# Create namespace
wrangler kv:namespace create "MY_KV"
wrangler kv:namespace create "MY_KV" --preview

# List keys
wrangler kv:key list --namespace-id=<ID>

# Get value
wrangler kv:key get "my-key" --namespace-id=<ID>

# Put value
wrangler kv:key put "my-key" "my-value" --namespace-id=<ID>
```

### D1 (Database)
```bash
# Create database
wrangler d1 create my-database

# Execute SQL
wrangler d1 execute my-database --command="SELECT * FROM users"

# Execute from file
wrangler d1 execute my-database --file=./schema.sql
```

### R2 (Object Storage)
```bash
# Create bucket
wrangler r2 bucket create my-bucket

# List buckets
wrangler r2 bucket list

# Upload file
wrangler r2 object put my-bucket/file.txt --file=./local-file.txt
```

## 🔧 Configuration Reference

### Environment Structure
```toml
# Default environment
name = "my-worker"
main = "src/index.js"

# Named environment
[env.production]
name = "my-worker-production"
vars = { ENVIRONMENT = "production" }

[[env.production.routes]]
pattern = "example.com/*"
zone_name = "example.com"
```

### Common Settings
```toml
# Node.js compatibility
compatibility_flags = ["nodejs_compat"]

# Observability
[observability]
enabled = true

# Variables (non-secret)
[vars]
API_URL = "https://api.example.com"
ENVIRONMENT = "production"

# Assets
[assets]
directory = "./dist"
```

## 🌐 DNS Setup

For Workers to handle requests, add DNS record:

```
Type: AAAA
Name: @ (or subdomain like "www")
Content: 100::
Proxy: Enabled (orange cloud icon)
```

## 📊 Project Configuration

### Silverback (wrangler.toml)
- Worker: `silverback-google`
- Domains: `silverback-google.com`
- Environments: production, staging, development

### Chigbulaws (wrangler.chigbulaws.toml)
- Worker: `chigbulaws-com`
- Domains: `chigbulaws.com`, `www.chigbulaws.com`
- Environments: production, staging, development

## 🐛 Debugging

### Check configuration
```bash
wrangler deploy --dry-run
wrangler deploy --dry-run --config wrangler.chigbulaws.toml
```

### View worker info
```bash
wrangler whoami                    # Check auth
wrangler deployments list          # List deployments
wrangler versions view <version>   # View specific version
```

### Test locally with specific port
```bash
wrangler dev --port 8788
```

## 🔐 Security Best Practices

1. **Never commit secrets** - Use `wrangler secret put` instead
2. **Use environment variables** for configuration
3. **Enable observability** for monitoring
4. **Test in staging** before production
5. **Use specific versions** in dependencies
6. **Validate all input** in your worker code
7. **Implement rate limiting** for public endpoints

## 📈 Performance Tips

1. **Cache aggressively** - Use Cache API for static assets
2. **Minimize external requests** - Batch when possible
3. **Use KV for read-heavy data** - Great for configuration
4. **Use D1 for relational data** - SQLite at the edge
5. **Optimize bundle size** - Workers have size limits
6. **Use Durable Objects** for state - When you need coordination

## 🚀 Next Steps

1. **Customize `src/index.js`** with your application logic
2. **Add domains** to Cloudflare account
3. **Configure DNS** records
4. **Deploy to staging** and test
5. **Deploy to production** when ready
6. **Monitor** logs and analytics
