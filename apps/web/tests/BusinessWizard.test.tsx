import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { NavigationButtons } from '@/components/features/business-wizard/NavigationButtons'
import { useBusinessStore } from '@/lib/business-store'

// Mock the Zustand store
vi.mock('@/lib/business-store', () => ({
  useBusinessStore: vi.fn()
}))

describe('Business Wizard - NavigationButtons', () => {
  it('disables the Back button on step 1', () => {
    (useBusinessStore as any).mockReturnValue({
      step: 1,
      nextStep: vi.fn(),
      prevStep: vi.fn()
    })

    render(<NavigationButtons isValid={true} />)
    const backBtn = screen.getByRole('button', { name: /Go to previous step/i })
    expect(backBtn).toBeDisabled()
  })

  it('enables the Back button on step 2', () => {
    (useBusinessStore as any).mockReturnValue({
      step: 2,
      nextStep: vi.fn(),
      prevStep: vi.fn()
    })

    render(<NavigationButtons isValid={true} />)
    const backBtn = screen.getByRole('button', { name: /Go to previous step/i })
    expect(backBtn).not.toBeDisabled()
  })

  it('disables the Next button if validation fails', () => {
    (useBusinessStore as any).mockReturnValue({
      step: 1,
      nextStep: vi.fn(),
      prevStep: vi.fn()
    })

    render(<NavigationButtons isValid={false} />)
    const nextBtn = screen.getByRole('button', { name: /Proceed to next step/i })
    expect(nextBtn).toBeDisabled()
  })
})
