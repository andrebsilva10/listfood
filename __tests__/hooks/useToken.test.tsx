import { renderHook, act } from '@testing-library/react-native';
import { useToken } from '@/hooks/useToken';
import AsyncStorageHelper from '@/helpers/AsyncStorageHelper';

// Mock AsyncStorageHelper
jest.mock('@/helpers/AsyncStorageHelper', () => ({
  getString: jest.fn(),
  setString: jest.fn(),
  removeItem: jest.fn(),
}));

const mockAsyncStorageHelper = AsyncStorageHelper as jest.Mocked<typeof AsyncStorageHelper>;

describe('useToken Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset all mocks before each test
    mockAsyncStorageHelper.getString.mockClear();
    mockAsyncStorageHelper.setString.mockClear();
    mockAsyncStorageHelper.removeItem.mockClear();
  });

  it('should initialize with null token and loading state', () => {
    mockAsyncStorageHelper.getString.mockResolvedValue(null);
    
    const { result } = renderHook(() => useToken());
    
    expect(result.current.token).toBeNull();
    expect(result.current.isLoading).toBe(true);
  });

  it('should load saved token from storage on mount', async () => {
    const savedToken = 'saved-token-123';
    mockAsyncStorageHelper.getString.mockResolvedValue(savedToken);
    
    const { result } = renderHook(() => useToken());
    
    // Wait for the effect to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(mockAsyncStorageHelper.getString).toHaveBeenCalledWith('@listfood:token');
    expect(result.current.token).toBe(savedToken);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle case when no token is saved', async () => {
    mockAsyncStorageHelper.getString.mockResolvedValue(null);
    
    const { result } = renderHook(() => useToken());
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.token).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should save token correctly', async () => {
    mockAsyncStorageHelper.getString.mockResolvedValue(null);
    mockAsyncStorageHelper.setString.mockResolvedValue(undefined);
    
    const { result } = renderHook(() => useToken());
    
    // Wait for initial load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    const newToken = 'new-token-456';
    
    await act(async () => {
      await result.current.saveToken(newToken);
    });
    
    expect(mockAsyncStorageHelper.setString).toHaveBeenCalledWith('@listfood:token', newToken);
    expect(result.current.token).toBe(newToken);
  });

  it('should remove token correctly', async () => {
    const initialToken = 'initial-token-789';
    mockAsyncStorageHelper.getString.mockResolvedValue(initialToken);
    mockAsyncStorageHelper.removeItem.mockResolvedValue(undefined);
    
    const { result } = renderHook(() => useToken());
    
    // Wait for initial load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.token).toBe(initialToken);
    
    await act(async () => {
      await result.current.removeToken();
    });
    
    expect(mockAsyncStorageHelper.removeItem).toHaveBeenCalledWith('@listfood:token');
    expect(result.current.token).toBeNull();
  });

  it('should handle storage errors gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockAsyncStorageHelper.getString.mockRejectedValue(new Error('Storage error'));
    
    const { result } = renderHook(() => useToken());
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao carregar token:', expect.any(Error));
    expect(result.current.token).toBeNull();
    expect(result.current.isLoading).toBe(false);
    
    consoleErrorSpy.mockRestore();
  });

  it('should not update state if component is unmounted', async () => {
    mockAsyncStorageHelper.getString.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve('delayed-token'), 100))
    );
    
    const { result, unmount } = renderHook(() => useToken());
    
    // Unmount before the async operation completes
    unmount();
    
    // Wait for the delayed operation
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });
    
    // The state should not have been updated after unmount
    expect(result.current.token).toBeNull();
  });

  it('should handle multiple rapid token operations', async () => {
    mockAsyncStorageHelper.getString.mockResolvedValue(null);
    mockAsyncStorageHelper.setString.mockResolvedValue(undefined);
    mockAsyncStorageHelper.removeItem.mockResolvedValue(undefined);
    
    const { result } = renderHook(() => useToken());
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Perform multiple operations rapidly
    await act(async () => {
      await result.current.saveToken('token1');
      await result.current.saveToken('token2');
      await result.current.removeToken();
      await result.current.saveToken('token3');
    });
    
    expect(result.current.token).toBe('token3');
    expect(mockAsyncStorageHelper.setString).toHaveBeenCalledTimes(3);
    expect(mockAsyncStorageHelper.removeItem).toHaveBeenCalledTimes(1);
  });
});