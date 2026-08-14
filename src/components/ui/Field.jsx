import { cn } from '../../lib/utils';

/** Label + control wrapper. Renders the control alone when no label is given. */
function Field({ id, label, children }) {
  if (!label) return children;

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
    </div>
  );
}

export function TextField({ id, label, className, ...props }) {
  return (
    <Field id={id} label={label}>
      <input id={id} className={cn('field', label && 'mt-1.5', className)} {...props} />
    </Field>
  );
}

export function TextAreaField({ id, label, className, ...props }) {
  return (
    <Field id={id} label={label}>
      <textarea
        id={id}
        className={cn('field resize-y', label && 'mt-1.5', className)}
        {...props}
      />
    </Field>
  );
}

/**
 * Select with a placeholder option. `options` entries render as
 * `<option value={value}>{label}</option>`; extra options can be passed as children.
 */
export function SelectField({
  id,
  label,
  options = [],
  placeholder = 'Select…',
  className,
  children,
  ...props
}) {
  return (
    <Field id={id} label={label}>
      <select id={id} className={cn('field', label && 'mt-1.5', className)} {...props}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        {children}
      </select>
    </Field>
  );
}
