# coding: utf-8

import json

arquivo_json = open("result.json", 'r')
loading_json = json.load(arquivo_json)
items = loading_json["nodes"]

genres = {}
edges = []

for node in items:
	for genre in node["genres"]:
		if genre not in genres.keys():
			genres[genre] = [node["id"]]
		else:
			genres[genre].append(node["id"])
for key in sorted(genres.keys(), key=lambda x: len(genres[x]), reverse = True):
	if len(genres[key])>2:
		for i in range(len(genres[key])-1):
			new_element = {"source":genres[key][i], "target":genres[key][i+1], "type":key}
			edges.append(new_element)
		
	
dict_salvar = {"nodes":items, "edges": edges}
dict_salvar = json.dumps(dict_salvar, indent=6,sort_keys=False)

arquivo_json = open("top50.json", "w")
arquivo_json.write(dict_salvar)
arquivo_json.close()
