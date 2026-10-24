import json,re,sys,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from collect_statements import Tree
class LibraryTests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.problems=json.loads((ROOT/'data/problems.json').read_text());cls.library=json.loads((ROOT/'data/statements.json').read_text());cls.source=json.loads((ROOT/'data/source/manifest.json').read_text())
 def test_exact_ids_and_coverage(self):
  self.assertEqual(len(self.problems),221);self.assertEqual(len({p['problemId'] for p in self.problems}),221)
  self.assertEqual(set(self.library),{p['label'] for p in self.problems})
  for label,record in self.library.items():
   with self.subTest(label=label):
    self.assertEqual(set(record),{'zh','ja','en'})
    self.assertTrue(all(len(v['html'])>100 and v['samples'] for v in record.values()))
    self.assertNotEqual(record['zh']['html'],record['ja']['html']);self.assertNotEqual(record['en']['html'],record['ja']['html'])
 def test_all_official_samples_preserved(self):
  for label,record in self.library.items():
   for lang,entry in record.items():
    with self.subTest(label=label,lang=lang):
     self.assertEqual(entry['samples'],self.source[label]['ja']['samples'])
     pre=[n.text().replace('\r\n','\n').strip('\n') for n in Tree(entry['html']).root.walk() if n.tag=='pre']
     for case in entry['samples']:
      for key in ['input','expected']:self.assertIn(case[key].strip('\n'),pre)
 def test_complete_sections_and_local_media(self):
  for label,record in self.library.items():
   for lang,entry in record.items():
    with self.subTest(label=label,lang=lang):
     tree=Tree(entry['html']).root;headings=' '.join(n.text() for n in tree.walk() if re.fullmatch(r'h[1-6]',n.tag))
     for section in {'zh':['约束','输入','输出'],'ja':['制約','入力','出力'],'en':['Constraints','Input','Output']}[lang]:self.assertIn(section,headings)
     for node in tree.walk():
      self.assertNotIn(node.tag,{'script','iframe','object','embed','form'})
      if node.tag=='img':
       self.assertTrue(node.attrs['src'].startswith('data/media/'));self.assertTrue((ROOT/node.attrs['src']).is_file())
 def test_no_language_fallback_or_runtime_translation(self):
  for label,record in self.library.items():
   for lang in ['zh','en']:
    with self.subTest(label=label,lang=lang):
     text=Tree(record[lang]['html']).root.text()
     self.assertFalse(re.search('[\u3040-\u309f]',text),'Unexpected Japanese hiragana')
  js=(ROOT/'app.js').read_text()
  for token in ['self.Translator','/__task?','/__statement_cache','translateOfficialElement']:self.assertNotIn(token,js)
 def test_bundle_matches_json(self):
  js=(ROOT/'data/statements.js').read_text();self.assertEqual(json.loads(js.removeprefix('window.CI_STATEMENTS=').rstrip(';\n')),self.library)
 def test_canonical_legacy_ids_and_metadata(self):
  p={p['label']:p for p in self.problems};self.assertEqual(p['ABC049C']['problemId'],'arc065_a');self.assertEqual(p['ABC086C']['problemId'],'arc089_a')
  m=json.loads((ROOT/'data/metadata.json').read_text());self.assertEqual(len(m),214);self.assertEqual(sum(v['point'] is not None for v in m.values()),205);self.assertEqual(sum(v['difficulty'] is not None for v in m.values()),205)
if __name__=='__main__':unittest.main()
