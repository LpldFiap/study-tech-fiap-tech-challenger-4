import usePosts from "@/hooks/usePosts";
import { getUser } from "@/services/user.service";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Post {
  _id: number;
  title: string;
  content: string;
  author: string;
}

export default function Home() {

  const { data: postsData } = usePosts() as unknown as {data:Post[]};

  const user = getUser()

  return(
    <View style={styles.homeContainer}>
      <View style={styles.infoField}>
        <Text style={styles.infoText}>Bom te ver {user?.name}!</Text>
        <View style={[styles.detailsContent, {borderTopStartRadius: 8, borderTopEndRadius: 8}]}>
            <Text>Publicações</Text>
          <View>
            <Text></Text>
            <Text></Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  infoField: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 24
  },
  detailsContent: {
    display: 'flex',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#87CEEB'
  },
  details: {
    width: '50%',
    padding: 5,
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});