
export type Update<Model, Action> = (model: Model) => (action: Action) => Model

export type Dispatch<Action> = (action: Action) => void

export type View<Model, Action> = (dispatch: Dispatch<Action>) => (model: Model) => HTMLElement

export type Muv<Model, Action> = (model: Model) => (update: Update<Model, Action>) => (view: View<Model, Action>) => (rootId: string) => void;

export type Render<Model, Action> = (dispatch: Dispatch<Action>) => (model: Model) => (view: View<Model, Action>) => (root: HTMLElement) => void

