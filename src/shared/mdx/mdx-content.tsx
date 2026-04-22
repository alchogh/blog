/* eslint-disable react-hooks/static-components --
 * MDX body is pre-compiled runtime content (a string). The React component
 * is derived from that string at render time, which is the whole point of
 * the wrapper. This is server-rendered and deterministic per `code` input.
 */
import * as runtime from "react/jsx-runtime";
import type { MDXComponents } from "mdx/types";
import { mdxComponents } from "./mdx-components";

type MDXModule = {
  default: (props: { components?: MDXComponents }) => React.ReactElement;
};

function evaluateMDX(code: string): MDXModule["default"] {
  const fn = new Function(code);
  return (fn({ ...runtime }) as MDXModule).default;
}

interface MDXContentProps {
  code: string;
  components?: MDXComponents;
}

export function MDXContent({ code, components }: MDXContentProps) {
  const Component = evaluateMDX(code);
  return <Component components={{ ...mdxComponents, ...components }} />;
}
