/* eslint-disable no-shadow */
export class UtilsProvider {
    /**
     * convert entity to dto class instance
     * @param {{new(entity: E, options: any): T}} model
     * @param {E[] | E} entity
     * @param options
     * @returns {T[] | T}
     */
    public static toDto<T, E>(
        model: new (entity: E, options?: GetConstructorArgs<T>[1]) => T,
        entity: E,
        options?: GetConstructorArgs<T>[1],
    ): T;
    public static toDto<T, E>(
        model: new (entity: E, options?: GetConstructorArgs<T>[1]) => T,
        entity: E[],
        options?: GetConstructorArgs<T>[1],
    ): T[];
    public static toDto<T, E>(
        model: new (entity: E, options?: GetConstructorArgs<T>[1]) => T,
        entity: E | E[],
        options?: GetConstructorArgs<T>[1],
    ): T | T[] {
        if (Array.isArray(entity)) {
            return entity.map((u) => new model(u, options));
        }

        return new model(entity, options);
    }
}
