(function() {
  let templates = null

  htmx.defineExtension("jsx-template", {
    init: function(api) {

      htmx.jsx = {}
      htmx.onLoad(async () => {
        templates = await import(`./dist/templates.js`)
      })
    },

    transformResponse: function(text, xhr, elt) {
      const name = elt.attributes['hx-template'].value
      const fn = templates[name] 
      if (!fn)
        throw new Error(`No template found for name: ${name}`)
      const data = JSON.parse(text)
      const result = fn(data)
      return result
    }
  })
})()
