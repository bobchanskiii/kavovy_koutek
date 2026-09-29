from pathlib import Path
from html.parser import HTMLParser

root = Path('u:/Kavovy_Koutek')
files = [root/'index.html', root/'cenik.html', root/'galerie.html']

class P(HTMLParser):
    pass

for file in files:
    text = file.read_text(encoding='utf-8')
    assert '<!DOCTYPE html>' in text.upper(), f'{file.name}: missing doctype'
    assert '<title>' in text.lower(), f'{file.name}: missing title'
    assert '<h1>' in text.lower(), f'{file.name}: missing h1'
    assert '<nav' in text.lower(), f'{file.name}: missing nav'
    assert '<footer' in text.lower(), f'{file.name}: missing footer'
    P().feed(text)
    print(f'{file.name}: OK')

text = (root/'cenik.html').read_text(encoding='utf-8')
assert text.lower().count('<tr>') >= 6, 'Table rows missing'
assert '<table' in text.lower(), 'Missing table'

text = (root/'galerie.html').read_text(encoding='utf-8')
assert text.lower().count('<img') >= 3, 'Gallery requires at least 3 images'
assert text.lower().count('<figcaption') >= 3, 'Gallery captions missing'
print('gallery: OK')
print('all checks passed')
