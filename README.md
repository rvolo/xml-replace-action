XML-Replace-Action

Simple github action to replace a value in a xml config file

Sample replace action
```yaml
- name: Set logback env values
  uses: rvolo/xml-replace-action@v0.2
  with:
    filepath: "config-file.xml"
    xpath: "//configuration/server/port/text()"
    replace: "5000"
```

