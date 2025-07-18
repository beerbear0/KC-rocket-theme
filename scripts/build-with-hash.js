import fs from 'fs'
import { execSync } from 'child_process'

try {
    // 1. Получаем git hash
    const hash = execSync('git rev-parse --short HEAD').toString().trim();

    // 2. Запускаем стандартную сборку Keycloakify
    console.log('Running keycloakify build...');
    execSync('keycloakify build', { stdio: 'inherit' });

    // 3. Переименовываем полученный JAR-файл
    const originalPath = ['./dist_keycloak/keycloak-theme-for-kc-22-to-25.jar', './dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar'];
    const newPath = [`./dist_keycloak/keycloak-theme-for-kc-22-to-25-${hash}.jar`, `./dist_keycloak/keycloak-theme-for-kc-all-other-versions-${hash}.jar`];

    if (fs.existsSync(originalPath[0])) {
        fs.renameSync(originalPath[0], newPath[0]);
        console.log(`Successfully renamed to ${newPath[0]}`);
    } else {
        console.error('Error: Original JAR file not found at', originalPath);
        process.exit(1);
    }

    if (fs.existsSync(originalPath[1])) {
        fs.renameSync(originalPath[1], newPath[1]);
        console.log(`Successfully renamed to ${newPath[1]}`);
    } else {
        console.error('Error: Original JAR file not found at', originalPath);
        process.exit(1);
    }
} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}