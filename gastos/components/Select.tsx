import { useRouter } from 'next/router';
import { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type SelectProps = {
  name: string;
  onChange: (event: { target: { value: string } }) => void;
  onBlur?: () => void;
  options: { value: string; render: ReactNode }[];
  value: string;
  placeholder?: string;
};

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (props, ref) => {
    const { push, asPath, back, replace } = useRouter();
    const selected = props.options.find(
      (option) => option.value === props.value,
    );

    const [isShowingMenu, setIsShowingMenu] = useState(false);

    const rootRef = useRef(document.getElementById('__next'));

    const initHash = `#init-${props.name}-menu`;
    const hash = `#${props.name}-menu`;

    useEffect(() => {
      if (window.location.hash === initHash) {
        setTimeout(() => {
          setIsShowingMenu(true);
        }, 0);
      }
    }, [initHash]);

    useEffect(() => {
      if (isShowingMenu && window.location.hash !== hash) {
        push(hash, undefined, { shallow: true });
      }

      if (!isShowingMenu && window.location.hash === hash) {
        replace('#', undefined, { shallow: true });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShowingMenu]);

    useEffect(() => {
      if (isShowingMenu && window.location.hash !== hash) {
        setIsShowingMenu(false);
      }

      if (!isShowingMenu && window.location.hash === hash) {
        setIsShowingMenu(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [asPath]);

    useEffect(() => {
      const handleClick = (event: any) => {
        const menuEl = document.getElementById(`${props.name}-menu`);
        if (!menuEl || menuEl.contains(event.target)) {
          return;
        }
        setIsShowingMenu(false);
      };

      const rootEl = rootRef.current;

      if (rootEl) {
        if (isShowingMenu) {
          rootEl.addEventListener('mousedown', handleClick);
          rootEl.addEventListener('touchstart', handleClick);
        }
      }

      return () => {
        if (rootEl) {
          rootEl.removeEventListener('mousedown', handleClick);
          rootEl.removeEventListener('touchstart', handleClick);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShowingMenu]);

    return (
      <>
        <button
          ref={ref}
          type="button"
          className="rounded-md border border-gray-700 bg-gray-800 p-4 text-left text-white"
          onClick={() => {
            setIsShowingMenu(true);
          }}
        >
          {selected?.render || (
            <span className="text-gray-400">
              {props.placeholder || 'Select'}
            </span>
          )}
        </button>

        {rootRef.current &&
          isShowingMenu &&
          createPortal(
            <div
              id={`${props.name}-menu`}
              className="absolute bottom-0 left-0 flex w-full justify-center"
            >
              <div
                className="border-t border-gray-700 bg-gray-800 p-4 text-white"
                style={{ maxWidth: 500 }}
              >
                <div className="-ml-4 -mt-4 flex flex-wrap">
                  {props.options.map((option) => (
                    <div
                      key={option.value}
                      className="ml-4 mt-4 rounded-3xl bg-gray-900 py-2 px-4 text-lg"
                      onClick={() => {
                        props.onChange({
                          target: {
                            value: option.value,
                          },
                        });
                        setIsShowingMenu(false);
                      }}
                    >
                      {option.render}
                    </div>
                  ))}
                </div>
              </div>
            </div>,
            rootRef.current,
          )}
      </>
    );
  },
);

Select.displayName = 'Select';
