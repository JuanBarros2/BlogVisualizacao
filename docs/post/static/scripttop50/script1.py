# coding: utf-8

import json

arquivo_json = open("table.json", 'r')
loading_json = json.load(arquivo_json)
items = loading_json["items"]

novos_items = []
num = 1
for node in items:
	obj = {"id":node["id"], "num": num, "name":node["name"], "genres":node["genres"], "img":node["images"][0]["url"], "url":node["external_urls"]["spotify"]}
	novos_items.append(obj)
	num = num + 1

dict_salvar = {"nodes": novos_items}
dict_salvar = json.dumps(dict_salvar, indent=6,sort_keys=False)

arquivo_json = open("result.json", "w")
arquivo_json.write(dict_salvar)
arquivo_json.close()
