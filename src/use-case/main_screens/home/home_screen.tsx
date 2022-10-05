import React, { useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SizedBox } from "../../../components/common/sized_box";
import GreetingView from "../../../components/home/greeting_view";
import { LatestRides } from "../../../components/home/latestRides";
import TotalUserStatisticView from "../../../components/home/total_user_statistic_view";
import VouchersSectionView from "../../../components/home/vouchers_section_view";
import { BonusesController } from "../../../infrastructure/axios/bonus_controller";
import { ChallengeController } from "../../../infrastructure/axios/challenge_controller";
import { NotificationController } from "../../../infrastructure/axios/notification_controller";
import { RidesController } from "../../../infrastructure/axios/rides_controller";
import { StatisticController } from "../../../infrastructure/axios/statisticController";
import { Bonus, IGetBonus } from "../../../infrastructure/models/bonus";
import {
  Challenge,
  IGetChallenge,
} from "../../../infrastructure/models/challenge";
import {
  IGetNotification,
  Notification,
} from "../../../infrastructure/models/notification";
import { IGetRide, Ride } from "../../../infrastructure/models/ride";
import {
  IGetStatistic,
  Statistic,
} from "../../../infrastructure/models/statistic";
import { ActionTypes } from "../../../infrastructure/redux/action_types";
import { StateModel } from "../../../infrastructure/redux/reducers";
import {
  showToast,
  ToastType,
} from "../../../infrastructure/toast/toast_helper";
import { screenSize } from "../../../resources/theme";

const HomeScreen: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const app = useSelector((state: StateModel) => state.app);
  const data = useSelector((state: StateModel) => state.data);

  const getUserNotification = React.useCallback(async () => {
    const notifications: Notification[] = [];
    const notificationController: NotificationController =
      new NotificationController(app.accessToken);
    const result: IGetNotification[] | undefined =
      await notificationController.getUserNotification();
    if (result !== undefined) {
      result.map((jsonNotification: IGetNotification) =>
        notifications.push(Notification.fromJson(jsonNotification)),
      );
      dispatch({
        type: ActionTypes.SET_NOTIFICATION_LIST,
        payload: notifications,
      });
    }
    dispatch({ type: ActionTypes.TOGGLE_GETTING_DATA });
    dispatch({ type: ActionTypes.SET_DATA_LOADED });
  }, [app.accessToken, dispatch]);

  const getUserChallenges = useCallback(async () => {
    const challenges: Challenge[] = [];
    const otherChallenges: Challenge[] = [];

    const challengController: ChallengeController = new ChallengeController(
      app.accessToken,
    );

    const result: IGetChallenge[] | undefined =
      await challengController.getUserChallengeList(app.user?.userId ?? "");

    const resultOTherChallenges: IGetChallenge[] | undefined =
      await challengController.getUserOtherChallengeList();

    if (result !== undefined) {
      result.map((jsonRide: IGetChallenge) =>
        challenges.push(Challenge.fromJson(jsonRide)),
      );
      dispatch({
        type: ActionTypes.SET_CHALLENGES_LIST,
        payload: challenges,
      });
    }
    if (resultOTherChallenges !== undefined) {
      resultOTherChallenges.map((jsonRide: IGetChallenge) =>
        otherChallenges.push(Challenge.fromJson(jsonRide)),
      );
      dispatch({
        type: ActionTypes.SET_OTHER_CHALLENGES_LIST,
        payload: otherChallenges,
      });
    }
    getUserNotification();
  }, [app.accessToken, app.user, dispatch, getUserNotification]);

  const getRides = React.useCallback(async () => {
    const rides: Ride[] = [];
    const rideController: RidesController = new RidesController(
      app.accessToken,
    );
    const result: IGetRide[] | undefined = await rideController.getUserRides(
      app.user?.userId ?? "",
    );
    if (result !== undefined) {
      result.map((jsonRide: IGetRide) =>
        rides.push(Ride.fromJson(jsonRide as IGetRide)),
      );
      dispatch({
        type: ActionTypes.SET_RIDE_LIST,
        payload: rides.reverse(),
      });
    }
    getUserChallenges();
  }, [app.accessToken, app.user, dispatch, getUserChallenges]);

  const getBonuses = React.useCallback(async () => {
    const bonuses: Bonus[] = [];
    const bonusController: BonusesController = new BonusesController(
      app.accessToken,
    );
    const result: IGetBonus[] | undefined =
      await bonusController.getUserBonuses(app.user?.userId ?? "");
    if (result !== undefined) {
      result.map((jsonRide: IGetBonus) =>
        bonuses.push(Bonus.fromJson(jsonRide)),
      );
      dispatch({
        type: ActionTypes.SET_BONUS_LIST,
        payload: bonuses,
      });
    }
    getRides();
  }, [app.accessToken, app.user, dispatch, getRides]);

  const getUserStatistic = React.useCallback(async () => {
    const statisticController: StatisticController = new StatisticController(
      app.accessToken,
    );

    const totalResult: IGetStatistic | undefined =
      await statisticController.getUserStatistic(
        app.user?.userId ?? "",
        "total",
      );
    const latestResult: IGetStatistic | undefined =
      await statisticController.getUserStatistic(
        app.user?.userId ?? "",
        "latest",
      );
    if (totalResult !== undefined) {
      dispatch({
        type: ActionTypes.SET_TOTAL_STATISTIC,
        payload: Statistic.fromJson(totalResult),
      });
    } else {
      showToast(
        ToastType.error,
        "Error",
        "We couldn't get your total statistics",
      );
    }
    if (latestResult !== undefined) {
      dispatch({
        type: ActionTypes.SET_LATEST_STATISTIC,
        payload: Statistic.fromJson(latestResult),
      });
    } else {
      showToast(
        ToastType.error,
        "Error",
        "We couldn't get your latest statistics",
      );
    }
    getBonuses();
  }, [app.accessToken, app.user, dispatch, getBonuses]);

  useEffect(() => {
    if (!data.dataLoaded) {
      dispatch({ type: ActionTypes.TOGGLE_GETTING_DATA });
      getUserStatistic();
    }
  }, [data.dataLoaded, getUserStatistic, dispatch]);

  if (app.isGettingData) {
    return <React.Fragment />;
  }

  return (
    <View style={styles.screen}>
      <ScrollView>
        <GreetingView />
        <TotalUserStatisticView />
        <SizedBox height={30} width={undefined} />
        <VouchersSectionView />
        <SizedBox height={30} width={undefined} />
        <LatestRides />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: screenSize.statusBar + 25,
  },
});

export default HomeScreen;
