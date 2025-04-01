const functionsHelpText = {
    en: {
        fullContent:
            `
            <div class="col-md-10">
                More content for English help pages will follow soon.
                <h6 class="bold mb-3" id="expert-mode">What is Expert Mode?</h6>
                <p>Expert Mode is an advanced search feature in Daseen that enhances your search experience by providing autocomplete suggestions for writing natural language queries in Elasticsearch. This allows you to construct complex queries more efficiently and retrieve precise results based on structured search logic.</p>

                <h6 class="bold mt-3 mb-3">How to Use Expert Mode</h6>
                <ul>
                    <li>You can enable or disable Expert Mode in the <strong>Settings</strong> page.</li>
                    <li>When <strong>Expert Mode is ON</strong>, the search bar will provide autocomplete suggestions to help you write more refined Elasticsearch queries.</li>
                    <li>When <strong>Expert Mode is OFF</strong>, the search bar will only suggest basic asset names, making it easier for general users to find data assets without needing advanced query syntax.</li>
                </ul>

                <h6 class="bold mb-3">What Happens If You Use the Wrong Syntax?</h6>
                <ul>
                    <li>If your query is incorrectly formatted, Elasticsearch may return an error or unexpected results.</li>
                    <li>Autocomplete suggestions aim to guide you toward valid queries, but it's still important to check your syntax before running a search.</li>
                    <li>If you're unsure how to structure your query, you can refer to our <strong>Elasticsearch Query Guide</strong> or disable Expert Mode for a simpler search experience.</li>
                </ul>

                <h6 class="bold mb-3">When Should You Use Expert Mode?</h6>
                <ul>
                    <li>If you are familiar with Elasticsearch query syntax and want more control over your search results.</li>
                    <li>When performing advanced searches that require filtering, aggregations, or custom queries.</li>
                    <li>If you need more precise and powerful search capabilities beyond simple asset name lookups.</li>
                </ul>
            </div>
            `
    },
    de: {
        fullContent:
            `
              <div class="col-md-10">
                <h6 class="bold mb-3" id="expert-mode">Was ist der Expertenmodus?</h6>
                <p>Der Expertenmodus ist eine erweiterte Suchfunktion in Daseen, die Ihr Sucherlebnis verbessert, indem sie Autovervollständigungsvorschläge für das Schreiben natürlicher Sprachabfragen in Elasticsearch bietet. Dadurch können Sie komplexe Abfragen effizienter erstellen und präzise Ergebnisse basierend auf einer strukturierten Suchlogik abrufen.</p>

                <h6 class="bold mt-3 mb-3">So verwenden Sie den Expertenmodus</h6>
                <ul>
                    <li>Sie können den Expertenmodus auf der Seite <strong>Einstellungen</strong> aktivieren oder deaktivieren.</li>
                    <li>Wenn der <strong>Expertenmodus AKTIVIERT</strong> ist, bietet die Suchleiste Autovervollständigungsvorschläge, um Ihnen beim Schreiben präziserer Elasticsearch-Abfragen zu helfen.</li>
                    <li>Wenn der <strong>Expertenmodus DEAKTIVIERT</strong> ist, schlägt die Suchleiste nur grundlegende Asset-Namen vor, was es allgemeinen Benutzern erleichtert, Datenbestände ohne komplexe Abfragesyntax zu finden.</li>
                </ul>

                <h6 class="bold mb-3">Was passiert, wenn Sie eine falsche Syntax verwenden?</h6>
                <ul>
                    <li>Wenn Ihre Abfrage falsch formatiert ist, kann Elasticsearch einen Fehler oder unerwartete Ergebnisse zurückgeben.</li>
                    <li>Die Autovervollständigungsvorschläge sollen Sie zu gültigen Abfragen führen, dennoch ist es wichtig, Ihre Syntax vor dem Start der Suche zu überprüfen.</li>
                    <li>Wenn Sie sich nicht sicher sind, wie Sie Ihre Abfrage strukturieren sollen, können Sie unseren <strong>Elasticsearch-Abfrageleitfaden</strong> konsultieren oder den Expertenmodus deaktivieren, um eine einfachere Suche zu ermöglichen.</li>
                </ul>

                <h6 class="bold mb-3">Wann sollten Sie den Expertenmodus verwenden?</h6>
                <ul>
                    <li>Wenn Sie mit der Elasticsearch-Abfragesyntax vertraut sind und mehr Kontrolle über Ihre Suchergebnisse haben möchten.</li>
                    <li>Wenn Sie erweiterte Suchen durchführen, die Filter, Aggregationen oder benutzerdefinierte Abfragen erfordern.</li>
                    <li>Wenn Sie eine präzisere und leistungsfähigere Suchfunktion benötigen, die über einfache Asset-Namenssuchen hinausgeht.</li>
                </ul>
            </div>
            `
    }
};

export default functionsHelpText;
