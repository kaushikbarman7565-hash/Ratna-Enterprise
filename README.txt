RATNA ENTERPRISE — construction materials website
=================================================

HOW TO OPEN
  Double-click index.html. That's it — no Node, no npm, no build step.

FILES
  index.html          all page markup + the icon set
  css/style.css       all styling (design tokens are at the top, section 02)
  js/script.js        all behaviour
  assets/images/      photos used on the page

WHAT TO EDIT FIRST
  1. js/script.js  ->  BUSINESS_CONFIG at the top.
     Phone, WhatsApp, email, address and hours all flow from there into
     the page, the footer and every WhatsApp message.

  2. js/script.js  ->  PRODUCTS array.
     Product names, descriptions, images and the enquiry messages.

  3. assets/images/
     Replace the .jpg files with your own photos, keeping the same file
     names, and everything updates automatically. Landscape photos around
     1400x1050 work best; the collage image is portrait.

  4. index.html  ->  search for "[GOOGLE MAP EMBED HERE]" and follow the
     comment above it to paste your Google Maps embed.

  5. index.html  ->  search for "[Customer testimonial" to add real reviews,
     and "[X]+" in the About section for the years figure.

NOTES
  The enquiry form does not use a server. It validates the fields and opens
  WhatsApp with the details typed out, ready for the customer to send.
