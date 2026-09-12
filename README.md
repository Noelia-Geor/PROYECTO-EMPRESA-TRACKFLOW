# SnackCheck — ¿Es saludable este snack?

## Propósito

SnackCheck es una automatización creada en n8n que analiza un producto a partir de su código de barras. Consulta los datos nutricionales reales en Open Food Facts y utiliza el azúcar, la sal, la grasa y el Nutri-Score para determinar si el producto es saludable, moderado o no saludable.

Después genera con IA un consejo breve y adaptado al resultado.

## Cómo funciona

1. El usuario envía un código de barras mediante una petición POST al webhook.
2. SnackCheck valida que el código de barras exista y sea numérico.
3. Consulta Open Food Facts para obtener los datos reales del producto.
4. Extrae y analiza el azúcar, la sal, la grasa y el Nutri-Score.
5. Calcula el nivel del producto: saludable, moderado o no saludable.
6. Según el resultado, la IA genera un consejo con un tono adaptado.
7. La automatización devuelve al usuario el veredicto y los datos principales.

## Configuración

Para utilizar SnackCheck se necesita:

- Un workflow activo en n8n.
- Una credencial de Groq configurada en n8n para generar los consejos con IA.
- Acceso a Open Food Facts, que no requiere API Key.
- El webhook de SnackCheck configurado con el método POST y la ruta `/nutrition-check`.

## Uso

Envía una petición POST al webhook de SnackCheck con un body en formato JSON:

{
  "barcode": "3017620422003"
}

Por ejemplo, el código `3017620422003` corresponde a Nutella.

SnackCheck devolverá el nombre del producto, el veredicto, los valores de azúcar, sal y grasa, y un consejo generado con IA.

## Manejo de errores

SnackCheck controla diferentes situaciones para evitar que el workflow falle:

- Si la petición está vacía, devuelve una explicación de cómo utilizar el servicio.
- Si falta el código de barras o contiene caracteres no numéricos, devuelve el error `INVALID_BARCODE`.
- Si el producto no existe en Open Food Facts, devuelve el error `PRODUCT_NOT_FOUND`.
- Si el producto existe pero no tiene suficientes datos nutricionales, no lo clasifica y devuelve una respuesta indicando que los datos son insuficientes.

## Limitaciones

- SnackCheck depende de la información disponible en Open Food Facts.
- Algunos productos pueden no existir o tener datos nutricionales incompletos.
- Si el Nutri-Score no está disponible, el veredicto se calcula únicamente con las reglas de semáforo.
- El consejo generado por IA es informativo y no sustituye el asesoramiento de un profesional de la nutrición.