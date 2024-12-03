import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerPushNotification, deregisterPushNotification } from '@/api/api';

type PermissionStatus = 'granted' | 'denied' | 'undetermined';

function normalizeDeviceId(deviceId: string): string {
  return deviceId.replace(/[^a-zA-Z0-9]/g, '-');
}

export async function registerForPushNotificationsAsync() {
  // 물리적 기기 확인
  if (!Device.isDevice) {
    throw new Error('Must use physical device for push notifications');
  }

  // Android 알림 채널 설정
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: '앱 광고 알림',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // 저장된 토큰 및 디바이스 정보, 권한 상태 확인
  const storedToken = await AsyncStorage.getItem('pushToken');
  const storedDeviceId = await AsyncStorage.getItem('deviceId');
  const storedPermissionStatus = (await AsyncStorage.getItem(
    'permissionStatus',
  )) as PermissionStatus;

  // 권한 상태 확인
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  const currentStatus = existingStatus as PermissionStatus;

  // 저장된 권한 상태와 현재 권한 상태가 다른 경우 처리
  if (storedPermissionStatus && storedPermissionStatus !== currentStatus) {
    if (currentStatus === 'granted' && storedToken && storedDeviceId) {
      await registerPushNotification(storedDeviceId, storedToken);
      await AsyncStorage.setItem('permissionStatus', currentStatus);
    }
  }

  // 권한 및 토큰 등록 케이스 처리
  return await handlePushNotificationRegistration(currentStatus, storedToken, storedDeviceId);
}

async function handlePushNotificationRegistration(
  status: PermissionStatus,
  storedToken: string | null,
  storedDeviceId: string | null,
): Promise<string | undefined> {
  // 이미 토큰이 있고 권한이 부여된 경우
  if (status === 'granted' && storedToken && storedDeviceId) {
    console.log('Existing push token found');
    return storedToken;
  }

  // 권한 요청 처리
  if (status === 'denied' || status === 'undetermined') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();

    // 권한 상태 변경 확인 및 저장
    await AsyncStorage.setItem('permissionStatus', newStatus);

    // 권한 거부된 경우
    if (newStatus === 'denied') {
      if (storedToken && storedDeviceId) {
        await deregisterPushNotification(storedDeviceId);
      }
      return undefined;
    }

    // denied에서 granted로 변경된 경우
    if (newStatus === 'granted' && storedToken && storedDeviceId) {
      await registerPushNotification(storedDeviceId, storedToken);
    }
  }

  // 프로젝트 ID 확인
  const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

  if (!projectId) {
    throw new Error('Project ID not found');
  }

  try {
    // 푸시 토큰 및 디바이스 ID 가져오기
    const pushTokenResponse = await Notifications.getExpoPushTokenAsync({ projectId });
    const pushTokenString = pushTokenResponse.data;
    const deviceId = Device.osBuildFingerprint;

    if (!deviceId) {
      throw new Error('No deviceId');
    }
    const id = normalizeDeviceId(deviceId);
    console.log(id);
    // 푸시 알림 등록
    await registerPushNotification(id, pushTokenString);

    // 토큰과 디바이스 ID 저장
    await AsyncStorage.setItem('pushToken', pushTokenString);
    await AsyncStorage.setItem('deviceId', id);
    await AsyncStorage.setItem('permissionStatus', 'granted');

    return pushTokenString;
  } catch (error) {
    console.error('Push Notification Registration Error:', error);
    throw new Error(`Registration failed: ${error}`);
  }
}
