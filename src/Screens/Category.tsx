import {Text} from 'react-native';
import {ImageBackground, View} from 'react-native';
import {Pressable} from 'react-native';
import {useQuery} from 'react-query';
import {BACKEND_API, color, fonts, Route} from '../config/constraint';
import {axiosInstance, fetchCategoriesIndividual} from '../Utils/bridge';

export default function Category({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  var {data: heritagesBycategory, isLoading} = useQuery(
    'category',
    () => fetchCategoriesIndividual(route.params.categoryId),
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 1000,
    },
  );
  heritagesBycategory = heritagesBycategory?.data.heritage;

  const heritageList = heritagesBycategory?.map(each => (
    <Pressable
      key={each.heritageId}
      onPress={() => {
        navigation.navigate(Route.Heritage, {
          heritageId: each?.heritageId,
          placeName: each?.placeName,
        });
      }}>
      <ImageBackground
        imageStyle={{opacity: 0.5, borderRadius: 15}}
        key={each.heritageId}
        source={{
          uri: `${BACKEND_API}/${each.featureImage}`,
        }}
        style={{
          borderRadius: 15,
          // elevation: 5,
          // shadowColor: color.Tabs,
          // margin: 10,
          marginVertical: 10,
          height: 100,
          width: 350,
        }}>
        <View
          style={{
            position: 'absolute',
            alignItems: 'flex-start',
            bottom: 10,
            gap: -15,
          }}>
          <Text
            style={{
              marginHorizontal: 10,
              paddingBottom: 10,
              fontFamily: fonts.bold,
              fontSize: 20,
              textAlign: 'center',
            }}>
            {each.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 13, fontFamily: fonts.medium}}>
                {each.description.substr(0, 20)}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  ));
  return (
    <View style={{backgroundColor: color.Background, flex: 1}}>
      <View
        style={{
          margin: 20,
          borderRadius: 20,
        }}>
        {heritageList}
      </View>
    </View>
  );
}
