import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";

import { cn } from "@/lib/utils";

const components: MDXRemoteProps["components"] = {
  h2: (props) => (
    <h2 className="font-serif text-3xl mt-12 mb-4 text-primary" {...props} />
  ),
  h3: (props) => (
    <h3 className="font-serif text-2xl mt-8 mb-3 text-foreground" {...props} />
  ),
  p: (props) => <p className="my-4 text-lg leading-relaxed" {...props} />,
  a: (props) => (
    <a
      className="text-primary underline decoration-secondary/40 underline-offset-4 hover:decoration-secondary"
      {...props}
    />
  ),
  ul: (props) => <ul className="my-4 pl-6 list-disc space-y-2" {...props} />,
  ol: (props) => <ol className="my-4 pl-6 list-decimal space-y-2" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-secondary pl-6 my-6 italic text-foreground/75"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  hr: () => <hr className="my-12 border-border" />,
  table: (props) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-left" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-border px-3 py-2 font-semibold text-foreground bg-muted/40"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border-b border-border px-3 py-2 align-top"
      {...props}
    />
  ),
};

interface MdxContentProps {
  source: string;
  className?: string;
}

export function MdxContent({ source, className }: MdxContentProps) {
  return (
    <div className={cn("prose-custom", className)}>
      <MDXRemote source={source} components={components} />
    </div>
  );
}
