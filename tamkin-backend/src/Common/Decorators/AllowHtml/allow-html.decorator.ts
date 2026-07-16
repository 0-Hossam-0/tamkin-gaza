import 'reflect-metadata';

/**
 * Decorator to mark a field that should preserve HTML content.
 * Use on DTO properties that should contain HTML tags (e.g., description, content).
 * Apply at the top of the decorator stack, before all validators.
 * 
 * @example
 * @AllowHtml()
 * @IsDefined()
 * @IsLanguageRecord()
 * description: Record<LanguageCode, string>;
 */
export const AllowHtml = () => (target: any, propertyKey: string | symbol) => {
  if (!propertyKey) return;
  // Store metadata on the prototype
  Reflect.defineMetadata('allowHtml', true, target, propertyKey);
};
