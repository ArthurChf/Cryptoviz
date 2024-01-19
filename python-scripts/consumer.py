from confluent_kafka import Consumer, KafkaError

consumer = Consumer({
    'bootstrap.servers': 'votre_broker_Kafka',
    'group.id': 'votre_groupe_de_consommateurs',
    'auto.offset.reset': 'earliest'
})

consumer.subscribe(['votre_sujet'])

while True:
    msg = consumer.poll(1.0)

    if msg is None:
        continue
    if msg.error():
        if msg.error().code() == KafkaError._PARTITION_EOF:
            print('Fin de la partition atteinte')
        else:
            print('Erreur lors de la consommation : {}'.format(msg.error()))
    else:
        print('Message reçu: {}'.format(msg.value()))
        # insérer dans mongo (upsert enlever les doublons)
        # Marquez le message comme inséré dans mongo (commit offset)
        consumer.commit()
        # traiter les données (document différent pour chaque étape de traitement)
        # inserer données dans data warehouse