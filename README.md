XML-Replace-Action based of rvolo/xml-replace-action@v0.2

Simple github action to replace a value in a xml config file or substring of value

Sample replace action

```yaml
- name: Set logback env values
  uses: EssVisionAB/xml-replace-action@v1
  with:
    filepath: "config-file.xml"
    xpath: "//configuration/server/url"
    replace: "testserver"
    newvalue: "localhost" (optional, when used replace targets string)
```
