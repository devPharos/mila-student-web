import React from 'react';

export function Dialog({ children, ...props }) {
  return (
    <div {...props}>
      {children}
    </div>
  );
// }

// export const DialogContent = React.forwardRef(
//   ({ children, ...props }, forwardedRef) => (
//     <DialogPrimitive.Content
//       {...props}
//       ref={forwardedRef}
//       className={styles.content}
//     >
//       <DialogPrimitive.Close
//         className={cx(styles.resetButton, styles.closeButton)}
//       >
//         <MenuIcon />
//       </DialogPrimitive.Close>
//       {children}
//     </DialogPrimitive.Content>
//   )
// );

// export const DialogTrigger = DialogPrimitive.Trigger;
// export const DialogClose = DialogPrimitive.Close;
