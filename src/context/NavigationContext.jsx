import { createContext, useReducer, useContext, useCallback } from "react";

const initialState = {
    activeBack: false,
    moveDefault: false,
    positionName: "default",
};

const ACTIONS = {
    ACTIVE_BACK: "ACTIVE_BACK",
    MOVE_DEFAULT: "MOVE_DEFAULT",
    POSITION_NAME: "POSITION_NAME",
};

const navigationReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ACTIVE_BACK:
            return { ...state, activeBack: action.payload };
        case ACTIONS.MOVE_DEFAULT:
            return { ...state, moveDefault: action.payload };
        case ACTIONS.POSITION_NAME:
            return { ...state, positionName: action.payload };
        default:
            return state;
    }
}

const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(navigationReducer, initialState);

    const setActiveBack = useCallback(
        (value) => dispatch({ type: ACTIONS.ACTIVE_BACK, payload: value }),
        []
    );
    const setMoveDefault = useCallback(
        (value) => dispatch({ type: ACTIONS.MOVE_DEFAULT, payload: value }),
        []
    );
    const setPositionName = useCallback(
        (value) => dispatch({ type: ACTIONS.POSITION_NAME, payload: value }),
        []
    );

    return (
        <NavigationContext.Provider
            value={{
                ...state,
                setActiveBack,
                setMoveDefault,
                setPositionName
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
}

/**
 * Hook para consumir el contexto fácilmente
 */
export const useNavigation = () => {
    const ctx = useContext(NavigationContext);
    if (!ctx) {
        throw new Error("useNavigation debe usarse dentro de <NavigationProvider>");
    }
    return ctx;
}
