/** Anchor to another site — always opened safely in a new tab. */
export function ExternalLink({ href, className, children, ...props }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
