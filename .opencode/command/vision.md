---
description: Analyze an image using local vision model via Ollama. Usage: /vision <image-file-path>
---

Run this PowerShell command to analyze $ARGUMENTS, then display the result to the user:

```powershell
$img = [Convert]::ToBase64String([IO.File]::ReadAllBytes("$ARGUMENTS"))
$body = @{
  model = "hf.co/mradermacher/GroundNext-7B-V0-GGUF:Q6_K"
  messages = @(@{role="user"; content="Describe what you see in this image. Be detailed but concise."; images=@($img)})
  stream = $false
} | ConvertTo-Json -Depth 4
$resp = Invoke-RestMethod -Uri "http://127.0.0.1:11434/api/chat" -Method POST -Body $body -ContentType "application/json" -TimeoutSec 120
Write-Output $resp.message.content
```
