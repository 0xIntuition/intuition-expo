import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@sourcePickerIndex';

interface SourcePickerContextType {
  sourceIndex: number;
  setSourceIndex: (index: number) => void;
}

const SourcePickerContext = createContext<SourcePickerContextType | undefined>(undefined);

interface SourcePickerProviderProps {
  children: ReactNode;
}

export function SourcePickerProvider({ children }: SourcePickerProviderProps) {
  const [sourceIndex, setSourceIndexState] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted value on mount
  useEffect(() => {
    const loadSourceIndex = async () => {
      try {
        const value = await AsyncStorage.getItem(STORAGE_KEY);
        if (value !== null) {
          setSourceIndexState(parseInt(value, 10));
        }
      } catch (error) {
        console.error('Error loading source picker index:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadSourceIndex();
  }, []);

  // Persist value whenever it changes
  const setSourceIndex = async (index: number) => {
    try {
      setSourceIndexState(index);
      await AsyncStorage.setItem(STORAGE_KEY, index.toString());
    } catch (error) {
      console.error('Error saving source picker index:', error);
    }
  };

  // Don't render children until we've loaded the persisted value
  if (!isLoaded) {
    return null;
  }

  return (
    <SourcePickerContext.Provider value={{ sourceIndex, setSourceIndex }}>
      {children}
    </SourcePickerContext.Provider>
  );
}

export function useSourcePicker() {
  const context = useContext(SourcePickerContext);
  if (context === undefined) {
    throw new Error('useSourcePicker must be used within a SourcePickerProvider');
  }
  return context;
}
