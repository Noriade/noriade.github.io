<?php
// Legacy contact handler. Keep this endpoint safe for non-static deployments.

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

function respond($status, $message, $http_status) {
    http_response_code($http_status);
    echo json_encode(['status' => $status, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function post_text($key, $max_length) {
    $value = $_POST[$key] ?? '';
    if (!is_string($value)) {
        respond('error', 'Valeur invalide', 400);
    }

    $value = trim($value);
    if ($value === '' || strlen($value) > $max_length || strpos($value, "\0") !== false) {
        respond('error', 'Valeur invalide', 400);
    }

    return $value;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond('error', 'Méthode non autorisée', 405);
}

$name = post_text('name', 120);
$message = post_text('message', 5000);
$email = post_text('email', 254);

// Email addresses and the subject-derived name must never contain header breaks.
if (strpos($email, "\r") !== false || strpos($email, "\n") !== false) {
    respond('error', 'Adresse email invalide', 400);
}

$validated_email = filter_var($email, FILTER_VALIDATE_EMAIL);
if ($validated_email === false) {
    respond('error', 'Adresse email invalide', 400);
}

if (strpos($name, "\r") !== false || strpos($name, "\n") !== false) {
    respond('error', 'Nom invalide', 400);
}

// Basic anti-spam: check for suspicious content
$suspicious_patterns = ['http://', 'https://', '<script', 'viagra', 'casino'];
$combined_content = strtolower($name . ' ' . $message);
foreach ($suspicious_patterns as $pattern) {
    if (strpos($combined_content, $pattern) !== false) {
        respond('error', 'Contenu suspect détecté', 400);
    }
}

// Rate limiting (simple session-based)
ini_set('session.use_strict_mode', '1');
session_set_cookie_params([
    'httponly' => true,
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    'samesite' => 'Lax'
]);
session_start();
$last_submit = $_SESSION['last_contact_submit'] ?? 0;
if (time() - $last_submit < 60) { // 1 minute cooldown
    respond('error', 'Trop de soumissions. Veuillez attendre.', 429);
}
$_SESSION['last_contact_submit'] = time();

// Prepare email
$to = 'contact@noriade.com';
$subject = 'Nouveau message depuis le site web: ' . substr($name, 0, 50);
$body = "Nom: $name\n\nEmail: $email\n\nMessage:\n$message\n\n--\nEnvoyé depuis noriade.com";

$headers = [
    'From' => 'noreply@noriade.com',
    'Reply-To' => $validated_email,
    'Content-Type' => 'text/plain; charset=UTF-8'
];

// Use mail() with safer headers
$header_string = '';
foreach ($headers as $key => $value) {
    $header_string .= $key . ': ' . $value . "\r\n";
}

if (mail($to, $subject, $body, $header_string)) {
    respond('success', 'Message envoyé avec succès', 200);
} else {
    respond('error', 'Erreur lors de l\'envoi du message', 500);
}
