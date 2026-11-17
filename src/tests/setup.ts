import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { useFavoritesStore } from '../stores/favorites'
afterEach(() => cleanup())
beforeEach(() => { localStorage.clear(); useFavoritesStore.setState({ favorites: [] }) })
