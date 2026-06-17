import re

with open('/home/scooby/Área de trabalho/DIEGO TESTE/index.html', 'r') as f:
    content = f.read()

# Remove the duplicated Meta Pixel section
content = content.replace(
    "    <!-- Meta Pixel Code (Fallback para navegadores sem JavaScript) -->\n    <noscript>\n      <img height=\"1\" width=\"1\" style=\"display:none\"\n        src=\"https://www.facebook.com/tr?id=1362520712382496&ev=PageView&noscript=1\"\n      />\n    </noscript>\n    <!-- End Meta Pixel Code -->\n    <noscript>\n      <img height=\"1\" width=\"1\" style=\"display:none\"\n        src=\"https://www.facebook.com/tr?id=1362520712382496&ev=PageView&noscript=1\"\n      />\n    </noscript>\n    <!-- End Meta Pixel Code -->",
    "    <!-- Meta Pixel Code (Fallback para navegadores sem JavaScript) -->\n    <noscript>\n      <img height=\"1\" width=\"1\" style=\"display:none\"\n        src=\"https://www.facebook.com/tr?id=1362520712382496&ev=PageView&noscript=1\"\n      />\n    </noscript>\n    <!-- End Meta Pixel Code -->"
)

# Define the maps section
maps_html = '''    <!-- GOOGLE MAPS - SEÇÃO CONTATO -->
    <div id="google-maps-section" style="width:100%; max-width:1200px; margin:40px auto; padding:0 20px;">
      <h2 style="text-align:center; color:#1a365d; font-family:Montserrat,sans-serif; margin-bottom:20px;">Localização</h2>
      <p style="text-align:center; color:#2d3748; font-family:Inter,sans-serif; margin-bottom:20px;">
        Avenida Maria de Jesus Condeixa, 655 - Jardim Palma Travassos, Ribeirão Preto - SP
      </p>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.0!2d-47.8044!3d-21.1547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA5JzE2LjkiUyA0N8KwNDgnMTQuNiJX!5e0!3m2!1spt-BR!2sbr!4v1718316000000!5m2!1spt-BR!2sbr" 
        width="100%" 
        height="450" 
        style="border:0; border-radius:8px; box-shadow:0 4px 6px rgba(0,0,0,0.1);" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>'''

# Add the maps section before closing </body> tag
content = content.replace(
    "    <!-- End Meta Pixel Code -->\n  </body>",
    "    <!-- End Meta Pixel Code -->\n" + maps_html + "\n  </body>"
)

with open('/home/scooby/Área de trabalho/DIEGO TESTE/index.html', 'w') as f:
    f.write(content)

print("Google Maps section added successfully!")
