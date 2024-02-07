# def signal_handler(signum, frame):
#     print('Signal d\'arrêt reçu, fermeture du processus')
    
#     process_binance_processing.terminate()
#     """process_binance_backup.terminate()
#     process_rss_feed_processing.terminate()
#     process_rss_feed_backup.terminate()"""
    
#     process_binance_processing.join()
#     """process_binance_backup.join()
#     process_rss_feed_processing.join()
#     process_rss_feed_backup.join()"""
    
#     sys.exit(0)
            
# def worker_topic_processing(topic):
#     consumer = KafkaConsumer(topic)
#     message = consumer.consume()
#     try:
#         consumer.subscribe([topic])
#         msg = consumer.poll()
#         if message:
#             print(f"Message reçu: {message.value()}")
#             try :
#                 json_message = json.loads(message.value().decode('utf-8'))
#             except json.decoder.JSONDecodeError:
#                 print('Unable to decode message to JSON: %s', message.value())
#             consumer.commit()
        
#         consumer.commit(asynchronous=False)
              
#     except KafkaException as e:
#         print(f'Error while consuming {topic}: {e}')
#     finally:
#         consumer.close()  
    
#     """
#     try:
#         consumer.subscribe([topic])

#         while True:
#             msg = consumer.poll()
#             if msg is None: 
#                 pass
#             if msg.error():
#                 if msg.error().code() == KafkaError._PARTITION_EOF:
#                     pass
#                 else:
#                     process_data(msg.value())
#                     pass
#             consumer.commit(asynchronous=False)  
#     except KafkaException as e:
#         print(f'Error while consuming {topic}: {e}')
#     finally:
#         consumer.close()    
#     """   

# def worker_topic_backup(topic):
#     consumer = create_consumer(topic)
#     try:
#         consumer.subscribe([topic])

#         #while True:
#         msg = consumer.poll(timeout=1.0)
#         if msg is None: 
#             pass
#         if msg.error():
#             if msg.error().code() == KafkaError._PARTITION_EOF:
#                 pass
#             else:
#                 print(msg.error())
#                 pass
#         insert_data(msg.value())
#         consumer.commit(asynchronous=False)  
#     except KafkaException as e:
#         print(f'Error while consuming {topic}: {e}')
#     finally:
#         consumer.close()  
        
# def insert_data(data):
#     try:
#         print(data)
#         # Stock dans mongodb
#     except Exception as e:
#         print(f'Error while inserting data: {e}')
        
# def process_binance_data(data):
#     try:
#         print('-----------------Processing Binance data-----------------')
#         print(f'Symbole : {data["symbol"]}')
#         # processing des données
#     except Exception as e:
#         print(f'Error while processing data: {e}')
        
# def process_rss_feed_data(data):
#     try:
#         print('-----------------Processing RSS feed data-----------------')
#         print(data)
#         # processing des données
#     except Exception as e:
#         print(f'Error while processing data: {e}')