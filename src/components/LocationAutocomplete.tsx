// src/components/LocationAutocomplete.tsx
'use client';

import { useEffect, useRef } from 'react';

interface Props {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

export default function LocationAutocomplete({ onPlaceSelected }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!window.google || !inputRef.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      { types: ['geocode'] }
    );
    autocomplete.addListener('place_changed', () => {
      onPlaceSelected(autocomplete.getPlace());
    });
  }, [onPlaceSelected]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Enter your address"
      className="w-full border rounded px-3 py-2"
    />
  );
}
