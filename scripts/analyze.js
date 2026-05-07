const fs = require("fs")
const path = require("path")

const root = "./src"

function scan(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file)
    if (fs.statSync(full).isDirectory()) {
      scan(full, files)
    } else if (file.endsWith(".js") || file.endsWith(".jsx")) {
      files.push(full)
    }
  })
  return files
}

function findImports(file) {
  const content = fs.readFileSync(file, "utf-8")
  const matches = content.match(/from ['"](.*)['"]/g) || []
  return matches.map(m => m.replace(/from ['"]|['"]/g, ""))
}

const files = scan(root)

files.forEach(file => {
  const imports = findImports(file)
  console.log("\n📄", file)
  imports.forEach(i => console.log("  ↳", i))
})