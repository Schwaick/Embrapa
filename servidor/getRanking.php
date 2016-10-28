<?php 
require 'config.php';

config::setHeaders();

$conn = config::getConn();

$stmt = $conn->prepare('
	SELECT u.id,u.nome,u.imagem,(COALESCE(p.nump,0)+COALESCE(r.numr,0)) soma
	FROM usuarios u
	LEFT JOIN (
	    SELECT usuarios.id,COUNT(*) nump
	    FROM perguntas
	    JOIN usuarios ON perguntas.usuario_id = usuarios.id
	    GROUP BY usuarios.id
	) p ON p.id = u.id
	LEFT JOIN (
	    SELECT usuarios.id,COUNT(*) numr
	    FROM respostas
	    JOIN usuarios ON respostas.usuario_id = usuarios.id
	    GROUP BY usuarios.id
	) r ON r.id = u.id
	ORDER BY soma DESC
');
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if(count($result) > 0) {
	echo json_encode($result,JSON_NUMERIC_CHECK);
} else {
	echo 0;
}
?>