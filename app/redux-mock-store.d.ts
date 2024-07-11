declare module 'redux-mock-store' {
    import { Store, AnyAction } from 'redux';
  
    interface MockStoreCreator {
      <S = any>(state?: S): MockStoreEnhanced<S, AnyAction>;
    }
  
    interface MockStoreEnhanced<S = any, A extends AnyAction = AnyAction> extends Store<S, A> {
      getActions(): A[];
      clearActions(): void;
    }
  
    const configureMockStore: () => MockStoreCreator;
    export default configureMockStore;
  }