# SnackCheck — Registro de pruebas

## TC-001 — Producto no saludable
**Entrada:** `{"barcode":"3017620422003"}`  
**Producto:** Nutella  
**Resultado esperado:** Veredicto NO SALUDABLE y consejo cauteloso.  
**Resultado:** PASS ✅

## TC-002 — Nutri-Score desfavorable
**Entrada:** `{"barcode":"5449000000996"}`  
**Producto:** Coca-Cola  
**Resultado esperado:** El Nutri-Score debe evitar que el producto sea clasificado como saludable.  
**Resultado:** PASS ✅

## TC-003 — Producto saludable
**Entrada:** `{"barcode":"8480000823489"}`  
**Producto:** Pan de molde integral sin azúcares añadidos  
**Resultado esperado:** Veredicto SALUDABLE y consejo positivo.  
**Resultado:** PASS ✅

## TC-004 — Producto no encontrado
**Entrada:** código de barras inexistente probado durante las pruebas  
**Resultado esperado:** Respuesta `PRODUCT_NOT_FOUND` sin detener el workflow.  
**Resultado:** PASS ✅

## TC-005 — Petición vacía
**Entrada:** `{}`  
**Resultado esperado:** Mostrar información sobre SnackCheck y cómo utilizar el servicio.  
**Resultado:** PASS ✅

## TC-006 — Código de barras ausente
**Entrada:** `{"producto":"Nutella"}`  
**Resultado esperado:** Error `INVALID_BARCODE`.  
**Resultado:** PASS ✅

## TC-007 — Código de barras no numérico
**Entrada:** `{"barcode":"ABC123"}`  
**Resultado esperado:** Error `INVALID_BARCODE`.  
**Resultado:** PASS ✅

## TC-008 — Producto moderado
**Entrada:** `{"barcode":"5601066600118"}`  
**Producto:** Flocos de milho Nacional 0%  
**Resultado esperado:** Veredicto MODERADO y consejo equilibrado.  
**Resultado:** PASS ✅