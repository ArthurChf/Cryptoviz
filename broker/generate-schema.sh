#!/bin/sh

until $(curl --output /dev/null --silent --head --fail http://schema-registry:8081); do
    printf '.'
    sleep 5
done

curl -X POST -H "Content-Type: application/vnd.schemaregistry.v1+json" \
    --data '{"schema": "{\"type\": \"array\",\"items\": {\"type\": \"record\",\"name\": \"News\",\"fields\": [{\"name\": \"link\", \"type\": \"string\"},{\"name\": \"title\", \"type\": \"string\"},{\"name\": \"resume\", \"type\": \"string\"},{\"name\": \"pubDate\", \"type\": \"string\"},{\"name\": \"creator\", \"type\": \"string\"},{\"name\": \"source\", \"type\": \"string\"}]}}"}' \
    http://schema-registry:8081/subjects/news-value/versions

curl -X POST -H "Content-Type: application/vnd.schemaregistry.v1+json" \
    --data '{"schema": "{\"type\": \"array\",\"items\": {\"type\": \"record\",\"name\": \"CryptoTicker\",\"fields\": [{\"name\": \"eventTime\", \"type\": \"long\"},{\"name\": \"symbol\", \"type\": \"string\"},{\"name\": \"priceChange\", \"type\": \"string\"},{\"name\": \"priceChangePercent\", \"type\": \"string\"},{\"name\": \"weightedAvgPrice\", \"type\": \"string\"},{\"name\": \"lastPrice\", \"type\": \"string\"},{\"name\": \"lastQuantity\", \"type\": \"string\"},{\"name\": \"bestBidPrice\", \"type\": \"string\"},{\"name\": \"bestBidQuantity\", \"type\": \"string\"},{\"name\": \"bestAskPrice\", \"type\": \"string\"},{\"name\": \"bestAskQuantity\", \"type\": \"string\"},{\"name\": \"openPrice\", \"type\": \"string\"},{\"name\": \"highPrice\", \"type\": \"string\"},{\"name\": \"lowPrice\", \"type\": \"string\"},{\"name\": \"totalTrades\", \"type\": \"int\"}]}}"}' \
    http://schema-registry:8081/subjects/crypto-value/versions
