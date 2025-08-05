export const html = noop_tagged_template;
export const css = noop_tagged_template;

function noop_tagged_template(strings, ...values) {
	return strings.reduce((out, str, i) => out + str + (values[i] ?? ""), "");
}
