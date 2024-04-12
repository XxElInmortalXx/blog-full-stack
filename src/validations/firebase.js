export const errorAuth = {
    'auth/app-deleted': 'La aplicación de Firebase ha sido eliminada.',
    'auth/app-not-authorized': 'La aplicación de Firebase no está autorizada para usar la Autenticación de Firebase.',
    'auth/argument-error': 'Se produjo un error al analizar un argumento relacionado con la autenticación.',
    'auth/invalid-api-key': 'Tu clave de API no es válida, por favor verifica que la has copiado correctamente desde la Consola de Firebase.',
    'auth/invalid-user-token': 'Las credenciales del usuario ya no son válidas. El usuario debe iniciar sesión nuevamente.',
    'auth/network-request-failed': 'Se ha producido un error de red (como tiempo de espera, conexión interrumpida o host inaccesible).',
    'auth/operation-not-allowed': 'El proveedor de inicio de sesión proporcionado está deshabilitado para este proyecto de Firebase.',
    'auth/too-many-requests': 'Las solicitudes a este proyecto de Firebase han sido bloqueadas temporalmente debido a demasiados intentos fallidos de inicio de sesión. Por favor, inténtalo de nuevo más tarde.',
    'auth/unauthorized-domain': 'El proyecto de Firebase no está autorizado para usar el dominio especificado.',
    'auth/user-disabled': 'La cuenta de usuario ha sido desactivada por un administrador.',
    'auth/user-token-expired': 'Las credenciales del usuario han caducado. El usuario debe iniciar sesión nuevamente.',
    'auth/web-storage-unsupported': 'Este navegador no es compatible o las cookies y los datos de terceros pueden estar deshabilitados.',
    'auth/account-exists-with-different-credential': 'Ya existe una cuenta con la misma dirección de correo electrónico pero con credenciales de inicio de sesión diferentes. Debes iniciar sesión con el proveedor original.',
    'auth/email-already-in-use': 'La dirección de correo electrónico ya está en uso por otra cuenta.',
    'auth/user-not-found': 'No hay ningún registro de usuario correspondiente a este identificador. Es posible que el usuario haya sido eliminado.',
    'auth/wrong-password': 'La contraseña es inválida o el usuario no tiene una contraseña.',
    'auth/invalid-email': 'La dirección de correo electrónico no es válida.',
    'auth/invalid-credential': 'Las credenciales de autenticación proporcionadas son incorrectas o han caducado.',
    'auth/operation-not-supported-in-this-environment': 'Esta operación no es compatible con el entorno en el que se está ejecutando esta aplicación. "location.protocol" debe ser http, https o chrome-extension y el almacenamiento web debe estar habilitado.',
    'auth/popup-blocked': 'No se pudo establecer una conexión con el popup. Es posible que haya sido bloqueado por el navegador.',
    'auth/popup-closed-by-user': 'El popup ha sido cerrado por el usuario antes de finalizar la operación.',
    'auth/provider-already-linked': 'Estas credenciales ya están asociadas con una cuenta de usuario diferente.',
    'auth/cancelled-popup-request': 'Esta operación ha sido cancelada debido a que se abrió otro popup en conflicto.',
    'auth/timeout': 'La operación ha expirado.',
    'auth/account-exists-with-different-credential': 'Ya existe una cuenta con la misma dirección de correo electrónico pero con credenciales de inicio de sesión diferentes. Inicia sesión usando un proveedor asociado con esta dirección de correo electrónico.',
    'auth/requires-recent-login': 'Esta operación es sensible y requiere autenticación reciente. Inicia sesión nuevamente antes de intentar esta solicitud.',
    'auth/user-mismatch': 'Las credenciales proporcionadas no corresponden al usuario que inició sesión anteriormente.',
    'auth/provider-already-linked': 'El usuario solo puede estar vinculado a una identidad para el proveedor dado.',
    'auth/no-such-provider': 'El proveedor especificado no está habilitado para este proyecto de Firebase.',
    'auth/invalid-verification-code': 'El código de verificación de credenciales no es válido.',
    'auth/invalid-verification-id': 'El ID de verificación utilizado para crear la credencial de autenticación telefónica no es válido.',
}
export const errorAnalytics = {
    'analytics/app-deleted': 'La aplicación de Analytics ha sido eliminada.',
    'analytics/app-not-authorized': 'La aplicación de Analytics no está autorizada para usar Firebase Analytics.',
    'analytics/invalid-credentials': 'Las credenciales de Analytics proporcionadas no son válidas.',
    'analytics/network-request-failed': 'Se produjo un error de red al enviar datos de Analytics.',
    'analytics/no-event-hits': 'No se registraron eventos debido a regulaciones específicas de privacidad.',
    'analytics/no-user-id': 'No se proporciona ID de usuario para el evento de Analytics.',
    'analytics/resource-not-found': 'No se pudo encontrar el recurso de Analytics.',
    'analytics/unauthenticated': 'El usuario no está autenticado para la operación solicitada.',
    'analytics/unsupported-platform': 'La plataforma actual no es compatible con Analytics.',
}
export const errorFirestore = {
    'firestore/aborted': 'La operación fue abortada, típicamente debido a un problema de concurrencia como abortos de transacciones, etc.',
    'firestore/already-exists': 'El documento que se va a crear ya existe.',
    'firestore/cancelled': 'La operación fue cancelada (típicamente por el solicitante).',
    'firestore/data-loss': 'Pérdida o corrupción irrecuperable de datos.',
    'firestore/deadline-exceeded': 'La operación se ha agotado en tiempo.',
    'firestore/failed-precondition': 'La operación fue rechazada porque el sistema no está en un estado requerido para la ejecución de la operación.',
    'firestore/internal': 'Errores internos.',
    'firestore/invalid-argument': 'El cliente especificó un argumento no válido.',
    'firestore/invalid-claim': 'La reclamación proporcionada no es válida.',
    'firestore/not-found': 'No se encontró algún documento solicitado.',
    'firestore/out-of-range': 'El cliente especificó un rango no válido.',
    'firestore/permission-denied': 'El solicitante no tiene permiso para ejecutar la operación especificada.',
    'firestore/resource-exhausted': 'Se ha agotado algún recurso.',
    'firestore/unauthenticated': 'La solicitud no tiene credenciales de autenticación válidas para la operación.',
    'firestore/unavailable': 'El servicio no está disponible en este momento.',
    'firestore/unimplemented': 'La operación no está implementada o no es compatible/habilitada.',
    'firestore/unknown': 'Error desconocido.',
}
export const errorStorage = {
    'storage/canceled': 'La carga o descarga fue cancelada.',
    'storage/unknown': 'Se produjo un error desconocido.',
    'storage/object-not-found': 'No existe ningún objeto en la referencia deseada.',
    'storage/bucket-not-found': 'No hay un depósito configurado para el Almacenamiento en la Nube.',
    'storage/project-not-found': 'No hay un proyecto configurado para el Almacenamiento en la Nube.',
    'storage/quota-exceeded': 'Se ha excedido la cuota en tu depósito de Almacenamiento en la Nube.',
    'storage/unauthenticated': 'El usuario no está autenticado.',
    'storage/unauthorized': 'El usuario no está autorizado para realizar la acción deseada.',
    'storage/retry-limit-exceeded': 'Se ha excedido el límite máximo de tiempo en una operación (carga, descarga, eliminación, etc.).',
    'storage/non-matching-checksum': 'El archivo en el cliente no coincide con el checksum del archivo recibido por el servidor.',
    'storage/download-size-exceeded': 'El tamaño de la descarga supera el tamaño máximo de descarga.',
    'storage/invalid-checksum': 'El archivo cargado o descargado tiene un checksum inválido.',
    'storage/invalid-url': 'La URL utilizada para crear una referencia no es válida.',
    'storage/expired-token': 'La URL de descarga ha caducado.',
}
export const errorMessaging = {
    'messaging/registration-token-not-registered': 'El token de registro proporcionado no está registrado.',
    'messaging/invalid-argument': 'Se proporcionaron argumentos no válidos para la API de FCM.',
    'messaging/registration-token-not-registered': 'El token de registro proporcionado no está registrado.',
    'messaging/missing-app-config-values': 'Valores de configuración faltantes para el SDK de FCM.',
    'messaging/invalid-app-credentials': 'Se proporcionaron credenciales de aplicación de Firebase no válidas.',
    'messaging/invalid-recipient': 'Destinatario del mensaje no válido (como token de registro no válido).',
    'messaging/authentication-error': 'Error de autenticación de FCM.',
    'messaging/server-unavailable': 'Servidor de FCM no disponible.',
    'messaging/too-many-topics': 'El cliente ha excedido el número máximo de temas permitidos para suscribirse.',
    'messaging/invalid-payload': 'Formato de carga útil del mensaje no válido.',
    'messaging/sender-id-mismatch': 'Inconsistencia en el ID del remitente.',
    'messaging/invalid-data-payload-key': 'Clave de carga útil de datos no válida.',
}
export const errorDatabase = {
    'database/disconnected': 'La operación tuvo que ser abortada debido a una red desconectada.',
    'database/permission-denied': 'El cliente no tiene permiso para acceder a los datos solicitados.',
    'database/data-stale': 'La operación accedió a una ubicación que ya no existe en la base de datos.',
    'database/aborted': 'La operación fue abortada por el usuario.',
    'database/invalid-token': 'El token de autenticación proporcionado no es válido.',
    'database/expired-token': 'El token de autenticación del usuario ha caducado.',
    'database/invalid-path': 'La ruta de referencia de la base de datos especificada no es válida.',
    'database/unknown-error': 'Se produjo un error desconocido.',
    'database/server-error': 'Se produjo un error en el servidor. Por favor, inténtalo de nuevo más tarde.',
    'database/write-cancelled': 'La escritura fue cancelada por el usuario.',
    'database/overridden-by-set': 'Una escritura fue anulada por un conjunto posterior.',
    'database/user-code-exception': 'Se produjo una excepción de código de usuario.',
}
