import { Input } from '@/components/ui/input';
import useAutocomplete from '@/src/hooks/useAutocomplete';
import React, { useState, useRef, useEffect, useCallback } from 'react';

const AutocompleteComponent = ({ setLocation }: { setLocation?: any }) => {
  const { query, setQuery, results, loading, error } = useAutocomplete();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSetQuery = useCallback(
    (data: any) => {
      setLocation(data);
      setQuery(data.display_name);
      setIsDropdownOpen(false);
    },
    [setLocation, setQuery]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isDropdownOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          setHighlightedIndex((prevIndex) =>
            prevIndex === null ? 0 : Math.min(prevIndex + 1, results.length - 1)
          );
          break;
        case 'ArrowUp':
          setHighlightedIndex((prevIndex) =>
            prevIndex === null ? 0 : Math.max(prevIndex - 1, 0)
          );
          break;
        case 'Enter':
          if (highlightedIndex !== null) {
            handleSetQuery(results[highlightedIndex]);
            event.preventDefault();
          }
          break;
        case 'Escape':
          setIsDropdownOpen(false);
          break;
        default:
          break;
      }
    },
    [isDropdownOpen, results, highlightedIndex, handleSetQuery]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  return (
    <div className="w-full relative" id="dark-mode" ref={wrapperRef}>
      <Input
        placeholder="Enter a state, locality or area"
        className="bg-white text-xs h-12"
        type="text"
        value={query}
        onChange={handleChange}
      />

      {/* {loading && <p className='absolute left-0 top-full mt-2 text-xs'>Loading...</p>} */}
      {/* {error && <p className='absolute left-0 top-full mt-2 text-sm text-red-500'>{error}</p>} */}
      {isDropdownOpen && results.length > 0 && (
        <ul id="dark-mode" className="absolute left-0 top-full mt-2 w-full bg-background border z-10">
          {results.map((result, index) => (
            <li
              className={`p-2 text-xs lowercase cursor-pointer hover:bg-muted h-9 whitespace-nowrap overflow-hidden text-overflow-ellipsis ${highlightedIndex === index ? 'bg-muted' : ''}`}
              key={index}
              onClick={() => handleSetQuery(result)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {result.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteComponent;
